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
import { _filmData } from '@/interface/_film';

export default function Home({
  featuredFilm,
  latestFilm,
  popularFilms,
}: {
  featuredFilm: _filmData[];
  latestFilm: _filmData[];
  popularFilms: _filmData[];
}) {
  useEffect(() => {
    SrHome();
  }, []);

  return (
    <div className={styles.Home}>
      <div className={styles.featuredComponents}>
        <Featured data={featuredFilm[0]} />
      </div>
      <div className={styles.filmComponent}>
        <div className={styles.sectionTitle}>
          <p id='sr-right'>Latest films</p>
          <div id='sr-right' className={styles.underBar1}></div>
          <div id='sr-right' className={styles.underBar2}></div>
        </div>
        <FilmList data={latestFilm} />
      </div>

      <div className={styles.filmComponent}>
        <div className={styles.sectionTitle}>
          <p id='sr-right'>Popular on Aspher</p>
          <div id='sr-right' className={styles.underBar1}></div>
          <div id='sr-right' className={styles.underBar2}></div>
        </div>
        <FilmList data={popularFilms} />
      </div>
    </div>
  );
}

Home.PageLayout = MainLayout;
Home.Title = 'Homepage - Aspher';
Home.Description =
  'Watch thousands of films on Aspher free of charge. High quality, low latency streaming for a seamless experience. Films are updated daily so you can have an endless option.';

export async function getStaticProps() {
  await dbConnect().catch((err) => {
    throw err;
  });
  let featuredFilm = await Film.aggregate([
    {
      $lookup: {
        from: 'episodes',
        localField: '_id',
        foreignField: 'belongTo',
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
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
  let latestFilm = await Episode.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: '$belongTo',
        createdAt: { $first: '$createdAt' },
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
    { $limit: 20 },
  ]);
  // Randomly sample 10 films and caculate ranking score
  let popularFilms: _filmData[] = await Film.aggregate([
    { $sample: { size: 10 } },
  ]).catch((err) => {
    throw err;
  });
  const caculateScore = (film: _filmData) => {
    const highScore = film.adminRecommended ? 1.25 : 1;
    const { like, dislike, followed } = film;
    return (like.length - dislike.length + followed * 2) * highScore;
  };
  const serialize = (data: any) => JSON.parse(JSON.stringify(data));

  popularFilms = serialize(
    popularFilms.sort((a, b) => caculateScore(b) - caculateScore(a))
  );
  featuredFilm = serialize(featuredFilm);
  latestFilm = serialize(latestFilm.map((item) => item.film[0]));

  return {
    props: {
      featuredFilm,
      latestFilm,
      popularFilms,
    },
    revalidate: 600,
  };
}
