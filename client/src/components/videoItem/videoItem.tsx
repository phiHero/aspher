// Essentials
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// Performance
import Image from 'next/image';
// Styles
import styles from './videoItem.module.scss';
import { ListReveal } from '../../animations/onScroll';

const VideoListItem = ({ item, animeId, container }) => {
  const router = useRouter();
  useEffect(() => {
    ListReveal(container);
  }, [container]);

  return (
    <div
      className={styles.VideoItem}
      onClick={() =>
        router.push(`watch/${animeId}/?episode=${item._id}`, undefined, {
          shallow: true,
        })
      }
      id='sr-right-list'
    >
      <div className={styles.thumbnail}>
        {item.thumbnail.includes('//') && (
          <Image
            className={styles.img}
            src={item.thumbnail}
            layout='fill'
            objectFit='cover'
            alt='thumbnail'
          />
        )}
      </div>
      <div className={styles.episodeInfo}>
        <span>Tập {item.tap} </span>
        <span id={styles.dash}>-</span>
      </div>
    </div>
  );
};

export default VideoListItem;
