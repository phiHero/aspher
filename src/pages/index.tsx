// Backend
import dbConnect from '../lib/dbConnect';
import Film from '../lib/model/Film';
import Episode from '../lib/model/Episode';
// Essentials
import { useEffect } from 'react';
// Types
// Styles
import styles from '../styles/home.module.scss';
import MainLayout from '../layout/mainLayout/mainLayout';
import Featured from '../components/featured/featured';
import FilmList from '../components/filmList/filmList';
import { SrHome } from '../animations/onScroll';

export default function Home({
  randomFilm,
  latestFilm,
}: {
  randomFilm: string;
  latestFilm: string;
}) {
  useEffect(() => {
    SrHome();
  }, []);

  return (
    <div className={styles.Home}>
      <div className={styles.featuredComponents}>
        <Featured data={JSON.parse(randomFilm)[0]} />
      </div>
      <div className={styles.filmComponent}>
        <div className={styles.sectionTitle}>
          <p id='sr-right'>Latest films</p>
          <div id='sr-right' className={styles.underBar1}></div>
          <div id='sr-right' className={styles.underBar2}></div>
        </div>
        <FilmList data={JSON.parse(latestFilm)} />
      </div>

      <div className={styles.filmComponent}>
        <div className={styles.sectionTitle}>
          <p id='sr-right'>Popular on Aspher</p>
          <div id='sr-right' className={styles.underBar1}></div>
          <div id='sr-right' className={styles.underBar2}></div>
        </div>
        <FilmList data={JSON.parse(latestFilm)} />
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
  const R_randomFilm = await Film.aggregate([
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
    { $sample: { size: 1 } },
  ]).catch((err) => {
    throw err;
  });
  const R_latestFilm = await Episode.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 20 },
    {
      $group: {
        _id: '$belongTo',
        createdAt: { $first: '$createdAt' },
        // tap: { $first: '$tap' },
      },
    },
    {
      $lookup: {
        from: 'films',
        localField: '_id',
        foreignField: '_id',
        as: 'film',
      },
    },
  ]);
  const randomFilm = JSON.stringify(R_randomFilm);

  const latestFilm = JSON.stringify(R_latestFilm.map((item) => item.film[0]));

  return {
    props: {
      randomFilm,
      latestFilm,
    },
    revalidate: 600,
  };
}
