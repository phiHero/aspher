// Backend
import dbConnect from '../../lib/dbConnect';
import Anime from '../../lib/model/Anime';
import Episode from '../../lib/model/Episode';
// Essentials
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
// Types
import { _data, _user } from '../../interface/_custom';
// Performance
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
// Styles
import styles from '../../styles/anime.module.scss';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ThumbDownAltRounded from '@mui/icons-material/ThumbDownAltRounded';
import MainLayout from '../../layout/mainLayout/mainLayout';
import { SrAnime } from '../../animations/onScroll';
import Loader from '../../components/loader/loader';
import { useInView } from 'react-intersection-observer';
import AnimationSync from '../../animations/onScroll';
import ReactPlayer from 'react-player/youtube';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';

export default function AnimeDetail({ anime }: { anime: string }) {
  const { inView, ref } = useInView();
  const [data, setData] = useState<_data>();
  const [user, setUser] = useState<_user>();
  //const [espisode, setEspisode] = useState([]);
  useEffect(() => {
    if (!anime) AnimationSync();
    anime && setData(JSON.parse(anime));
    if (anime && inView) {
      SrAnime();
    }
    setUser(JSON.parse(localStorage.getItem('user') || 'null'));
  }, [anime, inView]);
  const likeDislike = async (action: string) => {
    try {
      const res = await axios.put(`/api/user/action/like?action=${action}`, {
        animeID: data?._id,
      });
      res.data.episode = data?.episode;
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  const following = async () => {
    try {
      const res = await axios.put(`/api/user/action/following`, {
        animeID: data._id,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  if (!data) return <Loader />;

  return (
    <>
      <Head>
        <title>{data.title} - Asphero</title>
        <meta
          name='description'
          content={`Tập mới nhất: tập ${
            data.episode[data.episode.length - 1]?.tap || 'trailer'
          } - ${data.desc}`}
        />
      </Head>
      <div className={styles.Detail} data-anime-scroll-container>
        <div className={styles.background}></div>
        <div className={styles.detailHero}>
          <div ref={ref} className={styles.detailBackground}>
            {data.backgroundImg && (
              <Image
                className={styles.img}
                id='sr-right-img'
                src={data.backgroundImg}
                layout='fill'
                alt=''
              />
            )}
          </div>
          <div ref={ref} className={styles.detailHeader} id='sr-bottom-delay'>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.episode}>
              <span className={styles.infoType}>
                {data.isMovie ? 'Tập đặc biệt - Tập lẻ:' : 'Tập mới nhất:'}
              </span>
              {data.episode
                .filter((item, index) => {
                  return index >= data.episode.length - 3;
                })
                .reverse()
                .map((item, index) => {
                  return (
                    <Link
                      href={`/watch/${data._id}?episode=${item._id}`}
                      key={index}
                    >
                      <a className={styles.link}>Tập {item.tap}</a>
                    </Link>
                  );
                })}
            </div>
            <div className={styles.button}>
              <div className={styles.playButton}>
                <Link
                  href={`/watch/${data._id}?episode=${data.episode[0]?._id}`}
                >
                  <a>
                    <button>
                      <PlayArrowIcon className={styles.icon} /> Xem
                    </button>
                  </a>
                </Link>
              </div>
              <div className={styles.infoButton}>
                <button>
                  <a href='#episodeList'>
                    <InfoOutlinedIcon className={styles.icon} />
                    Thông tin thêm
                  </a>
                </button>
              </div>
              <div className={styles.likeButton}>
                <button
                  className={data.like.includes(user?._id) ? styles.active : ''}
                  onClick={() => likeDislike('like')}
                >
                  <ThumbUpAltRoundedIcon className={styles.icon} />
                </button>
              </div>
              <div className={styles.dislikeButton}>
                <button
                  className={
                    data.dislike.includes(user?._id) ? styles.active : ''
                  }
                  onClick={() => likeDislike('dislike')}
                >
                  <ThumbDownAltRounded className={styles.icon} />
                </button>
              </div>
              <div className={styles.followButton}>
                <button onClick={following}>
                  {user?.followedAnime.includes(data._id) ? (
                    <FavoriteRoundedIcon
                      className={`${styles.icon} ${styles.active}`}
                    />
                  ) : (
                    <FavoriteBorderRoundedIcon className={styles.icon} />
                  )}
                </button>
              </div>
            </div>
            <div className={styles.genre}>
              <span className={styles.infoType}>Thể loại: </span>{' '}
              {data.genre && data.genre.join(', ')}
            </div>
            <div className={styles.desc}>
              <span className={styles.infoType}>Mô tả: </span> {data.desc}
            </div>
          </div>
        </div>
        {!data.isMovie ? (
          <div className={styles.detailBody}>
            <div className={styles.sectionTitle}>
              <p id='sr-left'>Danh sách thông tin</p>
              <div id='sr-left' className={styles.underBar1}></div>
              <div id='sr-left' className={styles.underBar2}></div>
            </div>
            <div className={styles.moreInfo}>
              <div className={styles.container}>
                <div className={styles.info} id='sr-left'>
                  <div className={styles.genre}>
                    <span className={styles.infoType}>Thể loại:</span>
                    {data.genre.join(', ')}
                  </div>
                  <div className={styles.episodeCount}>
                    <span className={styles.infoType}>Số tập: </span>
                    {data.episode.length} tập
                  </div>
                  <div className={styles.year}>
                    <span className={styles.infoType}>Năm ra mắt: </span>
                    {data.year}
                  </div>
                  <div className={styles.likeCount}>
                    <span className={styles.infoType}>Số lượt thích: </span>
                    {data.like.length} lượt thích
                  </div>
                  <div className={styles.followCount}>
                    <span className={styles.infoType}>Số lượt theo dõi: </span>
                    {data.followed} lượt theo dõi
                  </div>
                  <div className={styles.rating}>
                    <div className={styles.liked} data-sr-bottom>
                      {(data?.like.length /
                        (data?.like.length + data?.dislike.length)) *
                        100 >
                      90 ? (
                        <span>
                          <ThumbUpAltSharpIcon id={styles.icon} /> Được yêu
                          thích
                        </span>
                      ) : null}
                    </div>
                    <div className={styles.userRecommended} data-sr-bottom>
                      {data.adminRecommended ? (
                        <span>
                          <FavoriteSharpIcon id={styles.icon} /> Đề xuất bởi
                          Users
                        </span>
                      ) : null}
                    </div>
                    <div className={styles.adminRecommended} data-sr-bottom>
                      {data.adminRecommended ? (
                        <span>
                          <FavoriteSharpIcon id={styles.icon} /> Đề xuất bởi
                          Admin
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className={styles.episodeList} id='episodeList'>
                  {data.episode.map((item, index) => (
                    <Link
                      href={`/watch/${data._id}?episode=${item._id}`}
                      key={index}
                    >
                      <a
                        className={styles.episodeLink}
                        id='sr-bottom-episode-delay'
                      >
                        {item.tap}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className={styles.video} id='sr-right-long'>
                <ReactPlayer
                  width={'100%'}
                  height={'100%'}
                  url={'https://www.youtube.com/watch?v=' + data.trailer}
                  controls={true}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
AnimeDetail.PageLayout = MainLayout;

export async function getStaticProps(context: { params: { animeId: string } }) {
  await dbConnect().catch((err) => {
    throw err;
  });
  const id = context.params.animeId;
  const R_anime = await Anime.findById(id)
    .populate({ path: 'episode', model: Episode })
    .catch((err) => {
      throw err;
    });
  const anime = JSON.stringify(R_anime);
  return {
    props: {
      anime,
    },
  };
}

export async function getStaticPaths() {
  await dbConnect().catch((err) => {
    throw err;
  });
  const latestAnime = await Anime.aggregate([
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
  const paths = latestAnime.map((item) => {
    return { params: { animeId: item._id.toString() } };
  });
  return {
    paths,
    fallback: true,
  };
}
