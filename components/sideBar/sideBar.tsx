// Essentials
import { useEffect, useState, useContext } from 'react';
import SideBarData from './sideBarData';
import { useRouter } from 'next/router';
// Performance
import Link from 'next/link';
import Image from 'next/image';
// Style
import styles from './sideBar.module.scss';
import picture from './unknown.png';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ForumIcon from '@mui/icons-material/Forum';
import { _user } from '../../interface/_custom';

const SideBar = () => {
  let router = useRouter();
  const [user, setUser] = useState<_user>();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || 'null'));
    document.documentElement.style.setProperty(
      '--custom-client-color',
      JSON.parse(localStorage.getItem('user') || '{}')?.customColor || '#008048'
    );
  }, []);
  return (
    <aside className={styles.Sidebar}>
      {/* Top sidebar */}
      <div className={styles.topSidebar}>
        <Link href={'/customize'}>
          <a className={styles.userLogo}>
            <div className={styles.userLogoBorder}>
              <Image src={picture} layout='responsive' alt='Ảnh đại diện' />
            </div>
          </a>
        </Link>
        <div className={`${styles.hiddenSidebar} ${styles.username}`}>
          Username
        </div>
        <div className={`${styles.hiddenSidebar} ${styles.ten}`}>
          {/* {user.username} */}
          {user ? user.username : 'Ẩn danh'}
        </div>
      </div>
      {/* Middle sidebar */}
      <div className={styles.middleSidebar} unselectable='on'>
        <ul className={styles.sidebarList}>
          <li
            className={styles.sidebarListItem}
            id={styles.sidebarListItemSearch}
          >
            <Link href={'/'}>
              <a className={styles.sidebarLink} id={styles.sidebarLinkSearch}>
                <SearchRoundedIcon
                  className={styles.sidebarIcon}
                  id={styles.sidebarIconSearch}
                />
                <input type='text' placeholder='Tìm kiếm...' />
              </a>
            </Link>
          </li>
          {SideBarData.map((item, index) => (
            <li
              className={
                router.pathname === item.path ||
                router.pathname === item.path + 'anime/[animeId]' ||
                router.pathname === item.path + 'watch/[animeId]'
                  ? // url ===
                    //   item.path +
                    //     `detail/${location.pathname.substring(
                    //       location.pathname.lastIndexOf('/') + 1
                    //     )}` ||
                    // url ===
                    //   item.path +
                    //     `watch/${location.pathname.substring(
                    //       location.pathname.lastIndexOf('/') + 1
                    //     )}`
                    `${styles.sidebarListItem} ${styles.active}`
                  : styles.sidebarListItem
              }
              key={index}
            >
              <Link href={item.path}>
                <a className={styles.sidebarLink}>
                  {item.icon}
                  <div className={styles.hiddenSidebar}>{item.title}</div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Bottom sidebar */}
      <div className={styles.bottomSidebar} unselectable='on'>
        <ul className={styles.sidebarList}>
          <li className={styles.sidebarListItem}>
            {user ? (
              <span className={styles.sidebarLink}>
                <LogoutIcon className={styles.sidebarIcon} />
                <div className={styles.hiddenSidebar}>Đăng xuất</div>
              </span>
            ) : (
              <span
                onClick={() => router.push('/auth/login')}
                className={styles.sidebarLink}
              >
                <LoginIcon className={styles.sidebarIcon} />
                <div className={styles.hiddenSidebar}>Đăng nhập</div>
              </span>
            )}
          </li>
          <li className={styles.sidebarListItem}>
            <Link href={'/'}>
              <a className={styles.sidebarLink}>
                <ForumIcon className={styles.sidebarIcon} />
                <div className={styles.hiddenSidebar}>Gửi Feedback</div>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
