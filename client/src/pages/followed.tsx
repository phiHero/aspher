// Essenstials
import { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import axios from 'axios';
// Styles
import styles from '../styles/followed.module.scss';
import MainLayout from '../layout/mainLayout/mainLayout';
import FilmList from '@/components/filmList/filmList';
import LoginAlert from '../components/loginAlert/loginAlert';
import Loader from '../components/loader/loader';
import Error from '../components/error/error';
import { _user } from '@/interface/_user';
import { SrSection } from '../animations/onScroll';
import { useInView } from 'react-intersection-observer';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Followed() {
  const [user, setUser] = useState<_user>();
  const { inView, ref } = useInView();
  const { data, error } = useSWR(
    user ? `/api/user/data/followed` : null,
    fetcher
  );
  useEffect(() => {
    if (inView && data) SrSection();
    setUser(JSON.parse(localStorage.getItem('user') || 'null'));
  }, [inView, data]);

  // Exception handling
  if (!user) return <LoginAlert />;
  if (error) return <Error />;
  if (!data) return <Loader />;

  return (
    <div className={styles.Followed}>
      <div ref={ref} className={styles.sectionTitle}>
        <p id='sr-right'>Followed films</p>
        <div id='sr-right' className={styles.underBar1}></div>
        <div id='sr-right' className={styles.underBar2}></div>
      </div>
      <div id='sr-right' className={styles.likedCount}>
        Total: {data.length} films!
      </div>

      {data?.length === 0 ? (
        <div className={styles.none}>
          Wow! You have such high standard! Haven&apos;t saved any films yet!
          Σ(っ °Д °;)っ
        </div>
      ) : (
        <FilmList data={data} />
      )}
    </div>
  );
}

Followed.PageLayout = MainLayout;
