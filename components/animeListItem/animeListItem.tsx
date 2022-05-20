// Essentials
import { useEffect, useState } from 'react';
// Types
import { _animeListItem } from '../../interface/_custom';
// Performance
import Image from 'next/image';
import Link from 'next/link';
// Styles
import styles from './animeListItem.module.scss';
import GridLoading from '../../animations/gridLoading';

const AnimeListItems = ({ item }: { item: _animeListItem }) => {
  const [isHovered, setisHovered] = useState(false);
  useEffect(() => {
    GridLoading();
  }, []);

  return (
    <Link href={`/detail/${item._id}`}>
      <a
        className={styles.GridItem}
        id='GridItem'
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
      >
        <div className={styles.listItemImg} id='gridItemImg'>
          <Image
            className={styles.img}
            src={item.backgroundImg}
            layout='fill'
            alt='Ảnh nền anime'
          />
        </div>
        {/* {isHovered && (
          <div className={styles.descContainer}>
            <div className={styles.video}>
              <video src={item.trailer} autoPlay={true} loop></video>
            </div>
            <div className={styles.desc}>
              <div className={styles.animeName}>{item.title}</div>
              <div className={styles.episode}>Số tập: {item.episode}</div>
            </div>
          </div>
        )} */}
      </a>
    </Link>
  );
};

export default AnimeListItems;
