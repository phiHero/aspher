// Backend
import dbConnect from '../lib/dbConnect';
import Anime from '../lib/model/Anime';
// Essentials
import { useEffect } from 'react';
// Types
// Styles
import styles from '../styles/home.module.scss';
import MainLayout from '../layout/mainLayout/mainLayout';
import Featured from '../components/featured/featured';
import AnimeList from '../components/animeList/animeList';
import { SrHome } from '../animations/onScroll';
import { _randomAnime } from '../interface/_custom';

export default function Home({
  randomAnime,
  latestAnime,
}: {
  randomAnime: string;
  latestAnime: string;
}) {
  useEffect(() => {
    SrHome();
  }, []);
  return (
    <div className={styles.Home}>
      <div className={styles.featuredComponents}>
        <Featured data={JSON.parse(randomAnime)[0]} />
      </div>
      <div className={styles.animeComponent}>
        <div className={styles.sectionTitle}>
          <p id='sr-right'>Mới cập nhật</p>
          <div id='sr-right' className={styles.underBar1}></div>
          <div id='sr-right' className={styles.underBar2}></div>
        </div>
        <AnimeList data={JSON.parse(latestAnime)} />
      </div>
    </div>
  );
}

Home.PageLayout = MainLayout;
Home.Title = 'Trang chủ';

export async function getStaticProps() {
  await dbConnect().catch((err) => {
    throw err;
  });
  const R_randomAnime = await Anime.aggregate([
    {
      $lookup: {
        from: 'episodes',
        localField: '_id',
        foreignField: 'belongTo',
        pipeline: [
          {
            $project: {
              _id: 1,
              tap: 1,
              createdAt: 1,
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 3 },
        ],
        as: 'episode',
      },
    },
    //  { $sample: { size: 1 } },
    { $match: { title: 'Jujutsu kaisen' } },
  ]).catch((err) => {
    throw err;
  });
  const R_latestAnime = await Anime.aggregate([
    {
      $project: {
        title: 1,
        episode: 1,
        backgroundImg: 1,
        updatedAt: 1,
      },
    },
    { $sort: { updatedAt: -1 } },
    { $limit: 20 },
  ]);
  const randomAnime = JSON.stringify(R_randomAnime);
  const latestAnime = JSON.stringify(R_latestAnime);
  return {
    props: {
      randomAnime,
      latestAnime,
    },
    revalidate: 600,
  };
}
