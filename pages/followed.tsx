// Essenstials
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
// Styles
import styles from '../styles/followed.module.scss';
import MainLayout from '../layout/mainLayout/mainLayout';
import AnimeListItems from '../components/animeListItem/animeListItem';
import LoginAlert from '../components/loginAlert/loginAlert';
import Loader from '../components/loader/loader';
import Error from '../components/error/error';
import { _user } from '../interface/_custom';

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem('user') || '{}').accessToken,
      },
    })
    .then((res) => res.data);

export default function Followed() {
  const [user, setUser] = useState<_user>();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'));
  }, []);
  const { data, error } = useSWR(user ? `/api/user/followed` : null, fetcher);
  if (!user) return <LoginAlert />;
  if (error) return <Error />;
  if (!data) return <Loader />;
  console.log(data);

  return (
    <div className={styles.Followed}>
      {/* <div className={styles.ad}>
        <p>Advertisement</p>
      </div> */}
      <div className='sectionTitle'>
        <p id='sr-right'>Danh sách yêu thích</p>
        <div id='sr-right' className='underBar1'></div>
        <div id='sr-right' className='underBar2'></div>
      </div>
      <div id='sr-right' className={styles.likedCount}>
        Tổng: {data.length} bộ!
      </div>

      {data?.length === 0 ? (
        <div className={styles.none}>
          Chà! Gu bạn hơi căng đấy, chưa yêu thích bộ nào! Σ(っ °Д °;)っ
        </div>
      ) : (
        <div className={styles.AnimeList}>
          {data.map((item, index: number) => {
            return <AnimeListItems key={index} item={item} />;
          })}
        </div>
      )}
    </div>
  );
}

Followed.PageLayout = MainLayout;
