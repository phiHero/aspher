// Essentials
import { useEffect, useState, useContext } from 'react';
import SideBarData from './sideBarData';
import { useRouter } from 'next/router';
// Performance
import Link from 'next/link';
import Image from 'next/image';
// Style
import styles from './sideBar.module.scss';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ForumIcon from '@mui/icons-material/Forum';
import { _user } from '@/interface/_user';
import axios from 'axios';

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
  const handleLogOut = async () => {
    try {
      await axios.get('/api/auth/logout');
      localStorage.removeItem('user');
      router.reload();
    } catch (error) {
      alert('Logout failed, please try later!');
    }
  };
  return (
    <aside className={styles.Sidebar}>
      {/* Top sidebar */}
      <div className={styles.topSidebar}>
        <Link href={'/customize'}>
          <a className={styles.userLogo}>
            <div className={styles.userLogoBorder}>
              <Image
                src={user?.profilePic || '/unknown.png'}
                layout='fill'
                objectFit='cover'
                alt='Ảnh đại diện'
              />
            </div>
          </a>
        </Link>
        <div className={`${styles.hiddenSidebar} ${styles.username}`}>
          Username
        </div>
        <div className={`${styles.hiddenSidebar} ${styles.ten}`}>
          {/* {user.username} */}
          {user ? user.username : 'Incognito'}
        </div>
      </div>
      {/* Middle sidebar */}
      <div className={styles.middleSidebar} unselectable='on'>
        <ul className={styles.sidebarList}>
          <li
            className={styles.sidebarListItem}
            id={styles.sidebarListItemSearch}
          >
            {/* <Link href={'/'}>
              <a className={styles.sidebarLink} id={styles.sidebarLinkSearch}>
                <SearchRoundedIcon
                  className={styles.sidebarIcon}
                  id={styles.sidebarIconSearch}
                />
                <input type='text' placeholder='Tìm kiếm...' />
              </a>
            </Link> */}
          </li>
          {SideBarData.map((item, index) => (
            <li
              className={
                router.pathname === item.path ||
                router.pathname === item.path + 'film/[filmId]' ||
                router.pathname === item.path + 'watch/[filmId]'
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
                  <div className={styles.iconWrapper}>{item.icon}</div>
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
              <button className={styles.sidebarLink} onClick={handleLogOut}>
                <div className={styles.iconWrapper}>
                  <LogoutIcon className={styles.sidebarIcon} />
                </div>
                <div className={styles.hiddenSidebar}>Logout</div>
              </button>
            ) : (
              <button
                onClick={() => router.push('/auth/login')}
                className={styles.sidebarLink}
              >
                <div className={styles.iconWrapper}>
                  <LoginIcon className={styles.sidebarIcon} />
                </div>
                <div className={styles.hiddenSidebar}>Login</div>
              </button>
            )}
          </li>
          <li className={styles.sidebarListItem}>
            <Link href={'/'}>
              <a className={styles.sidebarLink}>
                <div className={styles.iconWrapper}>
                  <ForumIcon className={styles.sidebarIcon} />
                </div>
                <div className={styles.hiddenSidebar}>Feedback</div>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
