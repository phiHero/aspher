import styles from './sideBar.module.scss';
import { Navigation, Film, User } from './sideBarData';
import Link from 'next/link';
import Image from 'next/image';
import unknown from './unknown.png';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import React from 'react';
import cn from 'classnames';
import logo from '../../../public/logo.png';
import { useRouter } from 'next/router';

export default function SideBar({ isOpen }: { isOpen: boolean }) {
  const router = useRouter();
  return (
    <div
      className={cn({
        [styles.Sidebar_open]: isOpen === true,
        [styles.Sidebar]: isOpen === false,
      })}
    >
      <aside className={styles.sidebar_wrapper} data-sidebar>
        {/* Top sidebar */}
        <div className={styles.top_sidebar}>
          <div className={styles.logo}>
            <Image src={logo} width={50} height={50} alt='Logo' />
            <span className={styles.logo_name}>dspher</span>
          </div>
        </div>
        {/* Middle sidebar */}
        <div className={styles.middle_sidebar} unselectable='on'>
          <ul className={styles.sidebar_navigation}>
            <div className={styles.heading}>Navigation</div>
            {Navigation.map((item, index) => (
              <li
                className={
                  router.pathname === item.path
                    ? `${styles.sidebar_item} ${styles.active}`
                    : styles.sidebar_item
                }
                key={index}
              >
                <Link href={item.path}>
                  <a className={styles.sidebar_link}>
                    {item.icon}
                    <div className={styles.link_name}>{item.title}</div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.sidebar_Film}>
            <div className={styles.heading}>Films</div>
            {Film.map((item, index) => (
              <li
                className={
                  router.pathname === item.path
                    ? `${styles.sidebar_item} ${styles.active}`
                    : styles.sidebar_item
                }
                key={index}
              >
                <Link href={item.path}>
                  <a className={styles.sidebar_link}>
                    {item.icon}
                    <div className={styles.link_name}>{item.title}</div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.sidebar_user}>
            <div className={styles.heading}>User</div>
            {User.map((item, index) => (
              <li
                className={
                  router.pathname === item.path
                    ? `${styles.sidebar_item} ${styles.active}`
                    : styles.sidebar_item
                }
                key={index}
              >
                <Link href={item.path}>
                  <a className={styles.sidebar_link}>
                    {item.icon}
                    <div className={styles.link_name}>{item.title}</div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Bottom sidebar */}
        <div className={styles.bottom_sidebar} unselectable='on'>
          {/* <li className={styles.sidebar_item}>
              {/* <Link to={''} className='sidebar-link'>
                    <ForumIcon className='sidebar-icon' />
                    <div className='hidden-sidebar'>Gửi Feedback</div>
                  </Link>
            </li> */}
        </div>
      </aside>
    </div>
  );
}
