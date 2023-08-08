// Essentials
import { useEffect } from 'react';
// Types
import { _animeListItem } from '../../src/interface/_custom';
// Styles
import s from './filmList.module.scss';
import FilmListItems from './filmListItem/filmListItem';
import GridLoading from '../../animations/gridLoading';
const FilmList = ({ data }: { data: _animeListItem[] }) => {
  useEffect(() => {
    GridLoading();
  }, []);
  return (
    <div className={s.FilmList} id='FilmList'>
      {data?.map((item: _animeListItem, index: number) => {
        return <FilmListItems key={index} item={item} />;
      })}
    </div>
  );
};

export default FilmList;
