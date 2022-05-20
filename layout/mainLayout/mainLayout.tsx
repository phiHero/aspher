// Essentials
import { useRouter } from 'next/router';
import { _children } from '../../interface/_react';
import SideBar from '../../components/sideBar/sideBar';
import HeaderBar from '../../components/headerBar/headerBar';
import { useEffect, useState } from 'react';
import styles from './mainLayout.module.scss';
import RevealAnimation from '../../animations/onScroll';

const MainLayout = ({ children }: _children) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const url = useRouter().pathname;

  useEffect(() => {
    RevealAnimation();
  }, [url]);

  return (
    <div className={styles.MainLayout}>
      <HeaderBar />
      <div className={styles.layout_container}>
        <SideBar />
        <main>
          <div className={styles.scroll} id='scroll'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
