// Essenstials
import { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import axios from 'axios';
// Styles
import styles from '../styles/followed.module.scss';
import MainLayout from '../layout/mainLayout/mainLayout';
import AnimeList from '../components/animeList/animeList';
import LoginAlert from '../components/loginAlert/loginAlert';
import Loader from '../components/loader/loader';
import Error from '../components/error/error';
import { _user } from '../interface/_custom';
import { SrSection } from '../animations/onScroll';
import { useInView } from 'react-intersection-observer';

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem('user') || 'null').accessToken,
      },
    })
    .then((res) => res.data);

export default function Followed() {
  const [user, setUser] = useState<_user>();
  const { inView, ref } = useInView();
  useEffect(() => {
    inView && SrSection();
    setUser(JSON.parse(localStorage.getItem('user') || 'null'));
  }, [inView]);
  const { data, error } = useSWR(
    user ? `/api/user/data/followed` : null,
    fetcher
  );
  // Exception handling
  if (!user) return <LoginAlert />;
  if (error) return <Error />;
  if (!data) return <Loader />;

  return (
    <div className={styles.Followed}>
      <div ref={ref} className={styles.sectionTitle}>
        <p id='sr-right'>Danh sách yêu thích</p>
        <div id='sr-right' className={styles.underBar1}></div>
        <div id='sr-right' className={styles.underBar2}></div>
      </div>
      <div id='sr-right' className={styles.likedCount}>
        Tổng: {data.length} bộ!
      </div>

      {data?.length === 0 ? (
        <div className={styles.none}>
          Chà! Gu bạn hơi căng đấy, chưa yêu thích bộ nào! Σ(っ °Д °;)っ
        </div>
      ) : (
        <AnimeList data={data} />
      )}
    </div>
  );
}

Followed.PageLayout = MainLayout;
