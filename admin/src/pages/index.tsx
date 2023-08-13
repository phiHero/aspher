import { style } from '@mui/system';
import Head from 'next/head';
import Chart from '../components/chart/chart';
import MainLayout from '../layouts/mainLayout';
import styles from '../styles/home.module.scss';
import useSWR from 'swr';
import axios from 'axios';
import UserTable from '../components/userTable/userTable';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home() {
  const { data, error } = useSWR('/api/analytic/total', fetcher);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={styles.Home}>
        <div className={styles.home_wrapper}>
          <h1 className={styles.section_name}>Dashboard</h1>
          <div className={styles.total}>
            <div className={styles.component}>
              <div className={styles.component_name}>Total active user</div>
              <div className={styles.component_value}>1,000</div>
            </div>
            <div className={styles.component}>
              <div className={styles.component_name}>Total user</div>
              <div className={styles.component_value}>{data?.totalUser}</div>
            </div>
            <div className={styles.component}>
              <div className={styles.component_name}>Total films</div>
              <div className={styles.component_value}>{data?.totalFilm}</div>
            </div>
            <div className={styles.component}>
              <div className={styles.component_name}>Total expense</div>
              <div className={styles.component_value}>50,000</div>
            </div>
          </div>
          <div className={styles.chart}>
            <div className={styles.component_name}>User analytics</div>
            <div className={styles.component_value}></div>
            <div className={styles.component}>
              <Chart
                data={data?.chartData.sort((a, b) => {
                  return a._id - b._id;
                })}
              />
            </div>
          </div>
          <div className={styles.new}>
            <div className={styles.newMember}>
              <div className={styles.component_name}>New user</div>
              <UserTable newMember={data?.newMember} />
            </div>
            <div className={styles.newFilm}>
              <div className={styles.component_name}>New user</div>
              <UserTable newMember={data?.newMember} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Home.PageLayout = MainLayout;
