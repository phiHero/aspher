// Essentials
import axios from 'axios';
import useSWR from 'swr';
import AnimeListItems from '../animeListItem/animeListItem';
// Styles
import styles from './animeList.module.scss';
import Loader from '../loader/loader';
import { _animeListItem } from '../../interface/_custom';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AnimeList = () => {
  const { data, error } = useSWR('/api/anime/latest', fetcher);
  if (error)
    return (
      <div style={{ width: '100%', height: '40vh' }}>
        Có lỗi xảy ra, vui lòng tải lại trang!
      </div>
    );
  if (!data)
    return (
      <div style={{ width: '100%', height: '40vh' }}>
        <Loader size={40} />
      </div>
    );

  return (
    <div className={styles.AnimeList} id='AnimeList'>
      {data?.map((item: _animeListItem, index: number) => {
        return <AnimeListItems key={index} item={item} />;
      })}
    </div>
  );
};

export default AnimeList;
