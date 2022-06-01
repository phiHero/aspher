// Backend
import dbConnect from '../../lib/dbConnect';
import Anime from '../../lib/model/Anime';
// Essentials
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// Types
import { _data, _user } from '../../interface/_custom';
// Performance
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
import { SrDetail } from '../../animations/onScroll';
import Loader from '../../components/loader/loader';
import { useInView } from 'react-intersection-observer';
import AnimationSync from '../../animations/onScroll';

export default function AnimeDetail({ anime }: { anime: string }) {
  const router = useRouter();
  const { inView, ref } = useInView();
  const [data, setData] = useState<_data>();
  const [user, setUser] = useState<_user>();
  //const [espisode, setEspisode] = useState([]);
  useEffect(() => {
    if (!anime) AnimationSync();
    anime && setData(JSON.parse(anime));
    if (anime && inView) {
      SrDetail();
    }
    setUser(JSON.parse(localStorage.getItem('user') || 'null'));
  }, [anime, inView]);
  const likeDislike = async (action: string) => {
    try {
      const res = await axios.put(
        `/api/user/action/like?action=${action}`,
        { animeID: data._id },
        {
          headers: {
            authorization: 'Bearer ' + user.accessToken,
          },
        }
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const following = async () => {
    try {
      const res = await axios.put(
        `/api/user/action/following`,
        {
          animeID: data._id,
        },
        {
          headers: {
            authorization: 'Bearer ' + user.accessToken,
          },
        }
      );
      res.data.accessToken = JSON.parse(
        localStorage.getItem('user') || 'null'
      ).accessToken;
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(JSON.parse(localStorage.getItem('user') || 'null'));
    } catch (err) {
      console.log(err);
    }
  };

  const play = () => {
    router.push(`/watch/${data._id}?espisode=${data.episode[0].tap}`);
  };
  if (!data) return <Loader />;
  return (
    <div className={styles.Detail}>
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
            <span>
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
                    href={`/watch/${data._id}?espisode=${item.tap}`}
                    key={index}
                  >
                    <a className={styles.link}>Tập {item.tap}</a>
                  </Link>
                );
              })}
          </div>{' '}
          <div className={styles.button}>
            <div className={styles.playButton}>
              <button onClick={play}>
                <PlayArrowIcon className={styles.icon} /> Xem
              </button>
            </div>
            <div className={styles.infoButton}>
              <button>
                <InfoOutlinedIcon className={styles.icon} />
                Thông tin thêm
              </button>
            </div>
            <div className={styles.likeButton}>
              <button
                className={data.like.includes(user._id) ? styles.active : ''}
                onClick={() => likeDislike('like')}
              >
                <ThumbUpAltRoundedIcon className={styles.icon} />
              </button>
            </div>
            <div className={styles.dislikeButton}>
              <button
                className={data.dislike.includes(user._id) ? styles.active : ''}
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
            <span>Thể loại: </span> {data.genre && data.genre.join(', ')}
          </div>
          <div className={styles.desc}>
            <span>Mô tả: </span> {data.desc}
          </div>
        </div>
      </div>
      {!data.isMovie ? (
        <div className={styles.detailBody}>
          <div className='sectionTitle'>
            <p id='sr-right'>Danh sách các tập</p>
            <div id='sr-right' className='underBar1'></div>
            <div id='sr-right' className='underBar2'></div>
          </div>
          {/* <div className={styles.trailer}>
            <video autoPlay={false} src={data.trailer}></video>
          </div> */}
          {/* <div className={styles.episodeList}>
            {data.episode &&
              data.espisode.map((item, index) => {
                return (
                  <VideoListItem
                    item={item}
                    data={detail}
                    key={index}
                    container='.scroll'
                  />
                );
              })}
          </div> */}
        </div>
      ) : null}
    </div>
  );
}
AnimeDetail.PageLayout = MainLayout;

export async function getStaticProps(context: { params: { animeId: string } }) {
  await dbConnect().catch((err) => {
    throw err;
  });
  const id = context.params.animeId;
  const R_anime = await Anime.findById(id).catch((err) => {
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
