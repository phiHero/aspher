// Essentials
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { _children } from '@/interface/_react';
// Performance
import Head from 'next/head';
// Styles
import styles from './mainLayout.module.scss';
import SideBar from '@/components/sideBar/sideBar';
import HeaderBar from '../../components/headerBar/headerBar';

const MainLayout = ({ children }: _children) => {
  // const url = useRouter().pathname;
  // const containerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className={styles.MainLayout}>
        <HeaderBar />
        <div className={styles.layoutContainer}>
          <SideBar />
          <main className={styles.mainContent}>
            <div className={styles.scroll} data-scroll-container>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
