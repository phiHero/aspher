// Essentials
import { useEffect, useRef } from 'react';
// Types
import { _newEpisode, _randomAnime } from '../../interface/_custom';
// Performance
import Link from 'next/link';
import Image from 'next/image';
// Style
import styles from './featured.module.scss';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { SrFeatured } from '../../animations/onScroll';

const Featured = ({ data }: { data: _randomAnime }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (
      (imageRef.current?.firstChild?.firstChild as HTMLImageElement | undefined)
        ?.complete
    )
      SrFeatured();
  }, []);

  return (
    <div className={styles.Featured}>
      <div className={styles.banner}>
        <div className={styles.backgroundImg} ref={imageRef}>
          {data.backgroundImg && (
            <Image
              data-sr-img-hero
              className={styles.img}
              unselectable='on'
              src={data.backgroundImg}
              alt='Highest rating anime'
              layout='fill'
              objectFit='cover'
            />
          )}
        </div>
        <div className={styles.bannerDetail} id='sr-bottom-delay-hero'>
          <div className={styles.bannerName}>
            <h1>{data.title}</h1>
          </div>
          {data.isMovie ? null : (
            <div className={styles.espisode}>
              <span id='info-type'>Tập mới nhất: </span>
              {data?.episode.map((item: _newEpisode, index: number) => {
                return (
                  <Link
                    key={index}
                    href={`/watch/${data._id}?episode=${item._id}`}
                  >
                    <a className={styles.link}>Tập {item.tap}</a>
                  </Link>
                );
              })}
            </div>
          )}
          <div className={styles.bannerRating}>
            <div className={styles.liked}>
              {(data?.like.length /
                (data?.like.length + data?.dislike.length)) *
                100 >
              90 ? (
                <span>
                  <ThumbUpAltSharpIcon id={styles.icon} /> Được yêu thích
                </span>
              ) : null}
            </div>
            <div className={styles.userRecommended}>
              {data.adminRecommended ? (
                <span>
                  <FavoriteSharpIcon id={styles.icon} /> Đề xuất bởi Users
                </span>
              ) : null}
            </div>
            <div className={styles.adminRecommended}>
              {data.adminRecommended ? (
                <span>
                  <FavoriteSharpIcon id={styles.icon} /> Đề xuất bởi Admin
                </span>
              ) : null}
            </div>
          </div>

          <div className={styles.genre}>
            <p className={styles.genreDisplay}>
              <span id='info-type'>Thể loại:</span>{' '}
              {data.genre && data.genre.join(', ')}
            </p>
          </div>
          <div className={styles.bannerDescription}>
            <p>
              <span id='info-type'>Mô tả: </span>
              {data.desc}
            </p>
          </div>
          <div className={styles.moreInfoButton}>
            <Link href={`/anime/${data._id}`}>
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
