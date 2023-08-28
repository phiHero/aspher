import styles from './headerBar.module.scss';
import sidebarStyles from '../sideBar/sideBar.module.scss';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Link from 'next/link';
import { _filmData } from '@/interface/_film';
import FuzzySearch from './FuzzySearch/FuzzySearch';
import { useRef, useState } from 'react';

const HeaderBar = () => {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [display, setDisplay] = useState(false);
  const searchBarVisible = () => {
    searchBarRef.current?.classList.toggle('visible');
    setDisplay(false);
  };
  return (
    <header className={styles.headerBar}>
      <div className={styles.leftCorner}>
        <button
          className={styles.menu_icon_btn}
          onClick={() =>
            document.getElementsByClassName(sidebarStyles.Sidebar) &&
            document
              .getElementsByClassName(sidebarStyles.Sidebar)[0]
              .classList.toggle(sidebarStyles.open)
          }
          aria-label='Navigation'
        >
          <span className={styles.menu_bar}></span>
          <span className={styles.menu_bar} id={styles.bar}></span>
          <span className={styles.menu_bar}></span>
        </button>
        <Link href={'/'}>
          <a className={styles.logo} unselectable='on'>
            <i>A</i>spher
          </a>
        </Link>
      </div>
      <div className={styles.rightCorner}>
        <button
          className={styles.iconButton}
          onClick={searchBarVisible}
          aria-label='Open search'
        >
          <SearchRoundedIcon className={styles.icon} />
        </button>
      </div>
      <FuzzySearch
        searchBarVisible={searchBarVisible}
        display={display}
        setDisplay={setDisplay}
        searchBarRef={searchBarRef}
      />
    </header>
  );
};
export default HeaderBar;
