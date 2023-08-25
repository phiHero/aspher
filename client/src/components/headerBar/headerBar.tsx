import styles from './headerBar.module.scss';
import sidebarStyles from '../sideBar/sideBar.module.scss';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../loader/loader';
import { _filmData } from '@/interface/_film';

const getSearchResult = async (query: string) => {
  try {
    const { data } = await axios.post(`/api/film/search?q=${query}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const HeaderBar = () => {
  const [searchData, setSearchData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const searchBarVisible = () => {
    searchBarRef.current?.classList.toggle(styles.visible);
    setDisplay(false);
  };
  const getSearchResultOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let query: string = e.target.value.trim();
    if (query.length > 3) {
      setIsLoading(true);
      let data = await getSearchResult(query);
      setSearchData(data);
      if (data) setIsLoading(false);
    } else {
      setIsLoading(false);
      setSearchData([]);
    }
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
      <div className={styles.searchBar} ref={searchBarRef}>
        <div></div>
        <div className={styles.search}>
          <button
            className={styles.iconButton}
            onClick={searchBarVisible}
            aria-label='Search'
          >
            <SearchRoundedIcon className={styles.icon} />
          </button>
          <input
            type='text'
            placeholder='Search films...'
            onChange={(e) => getSearchResultOnChange(e)}
            onFocus={() => setDisplay(true)}
          />

          {display && (
            <div className={styles.searchResult}>
              {isLoading ? (
                <Loader height='40vh' size='2.5vmax' />
              ) : (
                searchData?.map((item: _filmData, index: number) => (
                  <Link href={`/film/${item._id}`} key={index}>
                    <a className={styles.searchItem} onClick={searchBarVisible}>
                      <div className={styles.searchItemBgWrapper}>
                        <Image
                          className={styles.searchItemImg}
                          src={item.backgroundImg}
                          layout='fill'
                          objectFit='cover'
                          alt={item.title + ' background image.'}
                        />
                      </div>
                      <div className={styles.searchItemDetail}>
                        <h1 className={styles.searchItemTitle}>{item.title}</h1>
                        <div className={styles.searchItemOtherName}>
                          <span className={styles.infoType}>Other name: </span>
                          {item.otherName || 'none'}
                        </div>
                        <div className={styles.searchItemEpisode}>
                          <span className={styles.infoType}>
                            Number of episodes:{' '}
                          </span>{' '}
                          {(item.episode?.length || '?') + ' EP'}
                        </div>
                      </div>
                    </a>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
        <button
          className={styles.iconButton}
          onClick={searchBarVisible}
          aria-label='Close search'
        >
          <CloseIcon className={styles.icon} />
        </button>
      </div>
    </header>
  );
};
export default HeaderBar;
