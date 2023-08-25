// Essentials
import { useState } from 'react';
// Types
import { _filmData, _filmListItem } from '@/interface/_film';
// Performance
import Image from 'next/image';
import Link from 'next/link';
// Styles
import styles from './filmListItem.module.scss';

const AnimeListItems = ({ item }: { item: _filmData }) => {
  const [isHovered, setisHovered] = useState(false);

  return (
    <Link scroll={true} href={`/film/${item._id}`}>
      <a
        className={styles.GridItem}
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
      >
        <div className={styles.listItemImg} id='gridItemImg'>
          <Image
            className={styles.img}
            src={item.backgroundImg}
            layout='fill'
            objectFit='cover'
            alt={'wallpaper ' + item.title}
          />
        </div>
        <div className={styles.descContainer} data-hidden>
          <div className={styles.desc}>
            <div className={styles.filmName}>{item.title}</div>
            <div className={styles.episode}>
              Episodes: {item.episode.length} EP
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AnimeListItems;
