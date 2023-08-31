// Backend
import dbConnect from '../../lib/dbConnect';
import Film from '../../lib/model/Film';
import Episode from '../../lib/model/Episode';
// Essentials
import { useEffect, useState } from 'react';
import axios from 'axios';
// Types
import { _user } from '@/interface/_user';
// Performance
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
// Styles
import s from '../../styles/film.module.scss';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ThumbDownAltRounded from '@mui/icons-material/ThumbDownAltRounded';
import MainLayout from '../../layout/mainLayout/mainLayout';
import { SrFilm } from '../../animations/onScroll';
import { useInView } from 'react-intersection-observer';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import EpisodeList from '@/components/EpisodeList/EpisodeList';
import { _filmData } from '@/interface/_film';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Loader from '@/components/loader/loader';
const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
});

export default function FilmDetail({ film }: { film: _filmData }) {
  const router = useRouter();
  const { inView, ref } = useInView();
  const [data, setData] = useState<_filmData | null>(film);
  const [user, setUser] = useState<_user | null>(null);
  const [showDesc, setShowDesc] = useState(false);
  //const [espisode, setEspisode] = useState([]);
  useEffect(() => {
    if (inView) {
      SrFilm();
    }
    setUser(JSON.parse(localStorage.getItem('user') || 'null'));
  }, [inView]);

  const errHandler = (err: any) => {
    if (err.response.status === 401) {
      confirm('You need to login!') && router.push('/auth/login');
    } else {
      alert('Failed!');
    }
  };

  const likeDislike = async (action: string) => {
    try {
      const res = await axios.put(`/api/user/action/like?action=${action}`, {
        filmId: film?._id,
      });
      res.data.episode = film?.episode;
      setData(res.data);
    } catch (err: any) {
      errHandler(err);
    }
  };
  const following = async () => {
    try {
      const res = await axios.put(`/api/user/action/following`, {
        filmId: film._id,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } catch (err: any) {
      errHandler(err);
    }
  };
  if (!film) return <Loader />;

  return (
    <>
      <Head>
        <title>{film.title} - Aspher</title>

        <meta
          name='description'
          content={`Latest episode: episode ${
            film.episode[film.episode.length - 1]?.name || 'trailer'
          } - ${film.desc}`}
        />
      </Head>
      <div className={s.Detail} data-film-scroll-container>
        <div className={s.gradient}></div>
        <div className={s.detailHero}>
          <div ref={ref} className={s.detailBackground + ' unselectable'}>
            {film.backgroundImg && (
              <Image
                className={s.img}
                id='sr-right-img'
                src={film.backgroundImg}
                layout='fill'
                alt={`Watch ${film.title}, ${film.otherName || ''}`}
                priority
              />
            )}
          </div>
          <div ref={ref} className={s.detailHeader} id='sr-bottom-delay'>
            <div className={s.title}>{film.title}</div>
            <div className={s.episode}>
              <span className={s.infoType}>
                {film.isMovie ? 'Movie:' : 'Latest episodes:'}
              </span>
              {film.episode
                .filter((item: any, i: number) => {
                  return i >= film.episode.length - 3;
                })
                .reverse()
                .map((item: any, index: number) => {
                  return (
                    <Link
                      href={`/watch/${film._id}?episode=${item._id}`}
                      key={index}
                    >
                      <a className={s.link}>
                        {!data?.isMovie && 'EP'} {item.name}
                      </a>
                    </Link>
                  );
                })}
            </div>
            <div className={s.button}>
              <div className={s.playButton}>
                <Link
                  href={`/watch/${film._id}?episode=${film.episode[0]?._id}`}
                >
                  <a>
                    <button>
                      <PlayArrowIcon className={s.icon} /> Watch
                    </button>
                  </a>
                </Link>
              </div>
              <div className={s.infoButton}>
                <button>
                  <a href='#moreInfo'>
                    <InfoOutlinedIcon className={s.icon} />
                    More info
                  </a>
                </button>
              </div>
              <div className={s.likeButton}>
                <button
                  className={
                    user?._id && data?.like.includes(user._id) ? s.active : ''
                  }
                  onClick={() => likeDislike('like')}
                >
                  <ThumbUpAltRoundedIcon className={s.icon} />
                </button>
              </div>
              <div className={s.dislikeButton}>
                <button
                  className={
                    user?._id && data?.dislike.includes(user._id)
                      ? s.active
                      : ''
                  }
                  onClick={() => likeDislike('dislike')}
                >
                  <ThumbDownAltRounded className={s.icon} />
                </button>
              </div>
              <div className={s.followButton}>
                <button onClick={following}>
                  {user?.followedFilm.includes(film._id) ? (
                    <FavoriteRoundedIcon className={`${s.icon} ${s.active}`} />
                  ) : (
                    <FavoriteBorderRoundedIcon className={s.icon} />
                  )}
                </button>
              </div>
            </div>
            <div className={s.genre}>
              <span className={s.infoType}>Genres: </span>{' '}
              {film.genre && film.genre.join(', ')}
            </div>
            <div className={s.desc}>
              <p id='filmDesc' className={showDesc ? s.show : ''}>
                <span className={s.infoType}>Description: </span>
                {film.desc}
              </p>
              <button onClick={() => setShowDesc(!showDesc)}>
                {showDesc ? 'Hide' : 'Show more'}
              </button>
            </div>
          </div>
        </div>
        <div className={s.detailBody}>
          <div className={s.sectionTitle}>
            <p>Full information</p>
            <div className={s.underBar1}></div>
            <div className={s.underBar2}></div>
          </div>
          <div className={s.moreInfo}>
            <div className={s.container}>
              <div className={s.info}>
                <div className={s.episodeCount}>
                  <span className={s.infoType}>Number of episodes: </span>
                  {film.episode.length}
                </div>
                <div className={s.year}>
                  <span className={s.infoType}> Release year: </span>
                  {film.year}
                </div>
                <div className={s.likeCount}>
                  <span className={s.infoType}>Likes: </span>
                  {film.like.length}
                </div>
                <div className={s.likeCount}>
                  <span className={s.infoType}>Dislikes: </span>
                  {film.dislike.length}
                </div>
                <div className={s.followCount}>
                  <span className={s.infoType}>Follows: </span>
                  {film.followed}
                </div>
                <div className={s.rating} id='moreInfo'>
                  <div className={s.liked}>
                    {(film.like.length /
                      (film.like.length + film?.dislike.length)) *
                      100 >
                    90 ? (
                      <span>
                        <ThumbUpAltSharpIcon id={s.icon} /> Most liked
                      </span>
                    ) : null}
                  </div>
                  <div className={s.userRecommended} data-sr-bottom>
                    {film.adminRecommended ? (
                      <span>
                        <FavoriteSharpIcon id={s.icon} /> Most followed
                      </span>
                    ) : null}
                  </div>
                  <div className={s.adminRecommended} data-sr-bottom>
                    {film.adminRecommended ? (
                      <span>
                        <FavoriteSharpIcon id={s.icon} /> High scores
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
              {!film.isMovie && (
                <div className={s.episode_list_wrapper}>
                  <EpisodeList filmId={film._id} episodes={film.episode} />
                </div>
              )}
            </div>
            {data?.trailer && (
              <div className={s.video} id='sr-right-long'>
                <ReactPlayer
                  width={'100%'}
                  height={'100%'}
                  url={film.trailer}
                  controls={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
FilmDetail.PageLayout = MainLayout;

export async function getStaticProps(context: { params: { filmId: string } }) {
  await dbConnect().catch((err) => {
    throw err;
  });
  const id = context.params.filmId;
  const film = await Film.findById(id)
    .populate({ path: 'episode', model: Episode })
    .catch((err) => {
      throw err;
    });
  return {
    props: {
      film: JSON.parse(JSON.stringify(film)),
    },
    revalidate: 10, // revalidate to refresh user's likes & follows
  };
}

export async function getStaticPaths() {
  await dbConnect().catch((err) => {
    throw err;
  });
  const latestFilm = await Film.aggregate([
    {
      $project: {
        _id: 1,
      },
    },
    { $sort: { updatedAt: -1 } },
    { $limit: 20 },
  ]).catch((err) => {
    throw err;
  });
  const paths = latestFilm.map((item) => {
    return { params: { filmId: item._id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}
