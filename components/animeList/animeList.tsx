// Essentials
import { useEffect } from 'react';
// Types
import { _animeListItem } from '../../interface/_custom';
// Styles
import styles from './animeList.module.scss';
import AnimeListItems from '../animeListItem/animeListItem';
import GridLoading from '../../animations/gridLoading';
const AnimeList = ({ data }: { data: _animeListItem[] }) => {
  useEffect(() => {
    GridLoading();
  }, []);
  return (
    <div className={styles.AnimeList} id='AnimeList'>
      {data?.map((item: _animeListItem, index: number) => {
        return <AnimeListItems key={index} item={item} />;
      })}
    </div>
  );
};

export default AnimeList;
