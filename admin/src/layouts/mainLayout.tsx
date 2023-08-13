import { _children } from '../interface/_react';
import SideBar from '../components/sideBar/sideBar';
import HeaderBar from '../components/headerBar/headerBar';
import styles from './mainLayout.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { cloneElement } from 'react';
import Loader from '../components/loader/loader';
import axios from 'axios';

const MainLayout = ({ children }: _children) => {
  const [passingSearchData, setPassingSearchData] = useState<{
    _id: string;
    title: string;
    otherName: string;
    episode: string[];
    backgroundImg: string;
    // like: 1,
    // dislike: 1,
    // followed: 1,
    adminRecommended: boolean;
    genre: string[];
    year: string | number;
    desc: string;
    trailer: string;
    isMovie: boolean;
  }>();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post('/api/auth/verify');
        if (res.status === 200) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
          localStorage.removeItem('admin');
          router.push('/login');
        }
      } catch (error) {
        localStorage.removeItem('admin');
        router.push('/login');
      }
    };
    verify();
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }
  const processedPassingSearchData = passingSearchData && {
    ...passingSearchData,
    adminRecommended: passingSearchData?.adminRecommended.toString(),
    isMovie: passingSearchData?.isMovie.toString(),
    year: passingSearchData?.year.toString(),
  };
  return (
    <div className={styles.MainLayout}>
      <SideBar isOpen={isOpen} />
      <div className={styles.layout_container}>
        <HeaderBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setPassingSearchData={setPassingSearchData}
        />
        <main>
          {cloneElement(children, {
            passingSearchData: processedPassingSearchData,
          })}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
