// Essentials
import { _children } from '@/interface/_react';
// Styles
import styles from './mainLayout.module.scss';
import SideBar from '@/components/sideBar/sideBar';
import HeaderBar from '../../components/headerBar/headerBar';

const MainLayout = ({ children }: _children) => {
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
