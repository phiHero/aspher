import MainLayout from '../layout/mainLayout/mainLayout';
import Head from 'next/head';
import Featured from '../components/featured/featured';
import AnimeList from '../components/animeList/animeList';
import styles from '../styles/home.module.scss';
import { useEffect } from 'react';
import { SrSection } from '../animations/onScroll';

export default function Home() {
  useEffect(() => {
    SrSection();
  }, []);
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <div className={styles.Home}>
        <div className={styles.featuredComponents}>
          <Featured />
        </div>
        <div className={styles.animeComponent}>
          <div className='sectionTitle'>
            <p id='sr-right'>Mới phát hành</p>
            <div id='sr-right' className='underBar1'></div>
            <div id='sr-right' className='underBar2'></div>
          </div>
          <AnimeList />
        </div>
      </div>
    </>
  );
}

Home.PageLayout = MainLayout;
