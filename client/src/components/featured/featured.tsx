// Essentials
import { useEffect, useRef } from 'react';
// Types
import { _episodeData, _filmData } from '@/interface/_film';
// Performance
import Link from 'next/link';
import Image from 'next/image';
// Style
import s from './featured.module.scss';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import { SrFeatured } from '../../animations/onScroll';

const Featured = ({ data }: { data: _filmData }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (
      (imageRef.current?.firstChild?.firstChild as HTMLImageElement | undefined)
        ?.complete
    )
      SrFeatured();
  }, []);

  return (
    <div className={s.Featured}>
      <div className={s.banner}>
        <Link href={`/film/${data._id}`}>
          <div className={s.backgroundImg} ref={imageRef} id='unselectable'>
            {data.backgroundImg && (
              <Image
                data-sr-img-hero
                className={s.img}
                unselectable='on'
                src={data.backgroundImg}
                alt='Highest rating anime'
                layout='fill'
                objectFit='cover'
                priority
              />
            )}
          </div>
        </Link>

        <div className={s.bannerDetail} id='sr-bottom-delay-hero'>
          <div className={s.bannerName}>
            <h1>{data.title}</h1>
          </div>
          {data.isMovie ? null : (
            <div className={s.espisode}>
              <span id={s.infoType}>Latest episodes: </span>
              {data?.episode.map((item: _episodeData, index: number) => {
                return (
                  <Link
                    key={index}
                    href={`/watch/${data._id}?episode=${item._id}`}
                  >
                    <a className={s.link}>EP {item.name}</a>
                  </Link>
                );
              })}
            </div>
          )}
          <div className={s.bannerRating}>
            <div className={s.badge} id={s.liked}>
              {(data?.like.length /
                (data?.like.length + data?.dislike.length)) *
                100 >
              90 ? (
                <span>
                  <ThumbUpAltSharpIcon id={s.icon} /> Most liked
                </span>
              ) : null}
            </div>
            <div className={s.badge} id={s.userRecommended}>
              {data.adminRecommended ? (
                <span>
                  <FavoriteSharpIcon id={s.icon} /> Most followed
                </span>
              ) : null}
            </div>
            <div className={s.badge} id={s.adminRecommended}>
              {data.adminRecommended ? (
                <span>
                  <FavoriteSharpIcon id={s.icon} /> High scores
                </span>
              ) : null}
            </div>
          </div>

          <div className={s.genre}>
            <p className={s.genreDisplay}>
              <span id={s.infoType}>Genres:</span>{' '}
              {data.genre && data.genre.join(', ')}
            </p>
          </div>
          <div className={s.bannerDescription}>
            <p>
              <span id={s.infoType}>Description: </span>
              {data.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
