// Essentials
import axios from 'axios';
import useSWR from 'swr';
import { useEffect } from 'react';
// Types

// Performance
import Link from 'next/link';
import Image from 'next/image';
// Style
import styles from './featured.module.scss';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import Loader from '../loader/loader';
import Error from '../error/error';
import { SrFeatured } from '../../animations/onScroll';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const Featured = () => {
  const { data, error } = useSWR('/api/anime/highrating', fetcher);
  useEffect(() => {
    let x = 1;
    if (data && x == 1) SrFeatured();
    x++;
  }, [data]);
  if (error) return <Error />;
  if (!data)
    return (
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - var(--header-height))',
        }}
      >
        <Loader />
      </div>
    );

  return (
    <div className={styles.Featured}>
      <div className={styles.banner}>
        <div className={styles.backgroundImg}>
          {data[0].backgroundImg && (
            <Image
              id='sr-right-img-hero'
              className={styles.bannerImg}
              unselectable='on'
              src={data[0].backgroundImg}
              alt='Highest rating anime'
              layout='fill'
            />
          )}
        </div>
        <div className={styles.bannerDetail} id='sr-bottom-delay-hero'>
          <div className={styles.bannerName}>
            <h1>{data[0].title}</h1>
          </div>
          {data[0].isMovie ? null : (
            <div className={styles.espisode}>
              <span id='info-type'>Tập mới nhất: </span>
              {data[0].episode &&
                data[0].episode
                  .filter((item: object, index: number) => {
                    return index >= data[0].espisode.length - 3;
                  })
                  ?.reverse()
                  .map((item: { tap: number | string }, index: number) => {
                    return (
                      <Link
                        key={index}
                        href={`/watch/${data[0]._id}?espisode=${item.tap}`}
                      >
                        <a className={styles.link}>Tập {item.tap}</a>
                      </Link>
                    );
                  })}
            </div>
          )}
          <div className={styles.bannerRating}>
            <div className={styles.liked}>
              {(data[0].like?.length /
                (data[0].like?.length + data[0].dislike?.length)) *
                100 >
              90 ? (
                <span>
                  <ThumbUpAltSharpIcon id={styles.icon} /> Được yêu thích
                </span>
              ) : null}
            </div>
            <div className={styles.recommended}>
              {data[0].isRecommended ? (
                <span>
                  <FavoriteSharpIcon id={styles.icon} /> Đề xuất bởi admin
                </span>
              ) : null}
            </div>
          </div>

          <div className={styles.genre}>
            <p className={styles.genreDisplay}>
              <span id='info-type'>Thể loại:</span>{' '}
              {data[0].genre && data[0].genre.join(', ')}
            </p>
          </div>
          <div className={styles.bannerDescription}>
            <p>
              <span id='info-type'>Mô tả: </span>
              {data[0].desc}
            </p>
          </div>
          <div className={styles.moreInfoButton}>
            <Link href={`/detail/${data[0]._id}`}>
              <a className={styles.link}>
                <ArrowForwardSharpIcon id={styles.icon} />
                <span>Xem thêm</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
