// Essentials
import { useRouter } from 'next/router';
import { _children } from '../../interface/_react';
import SideBar from '../../components/sideBar/sideBar';
import HeaderBar from '../../components/headerBar/headerBar';
import { useEffect } from 'react';
// Styles
import styles from './mainLayout.module.scss';

const MainLayout = ({ children }: _children) => {
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
