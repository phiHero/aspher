import styles from './headerBar.module.scss';
import sidebarStyles from '../sideBar/sideBar.module.scss';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../loader/loader';

const getSearchResult = async (query: string) => {
  try {
    const { data } = await axios.post(`/api/anime/search?q=${query}`);
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
      console.log(data);
      if (data) setIsLoading(false);
    } else {
      setIsLoading(false);
      setSearchData([]);
    }
  };
  console.log(display);
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
        >
          <span className={styles.menu_bar}></span>
          <span className={styles.menu_bar} id={styles.bar}></span>
          <span className={styles.menu_bar}></span>
        </button>
        <div className={styles.logo} unselectable='on'>
          <i>A</i>sphero
        </div>
      </div>
      <div className={styles.rightCorner}>
        <button className={styles.iconButton} onClick={searchBarVisible}>
          <SearchRoundedIcon className={styles.icon} />
        </button>
      </div>
      <div className={styles.searchBar} ref={searchBarRef}>
        <div></div>
        <div className={styles.search}>
          <input
            type='text'
            placeholder='Tìm kiếm anime...'
            onChange={(e) => getSearchResultOnChange(e)}
            onFocus={() => setDisplay(true)}
          />

          {display && (
            <div className={styles.searchResult}>
              {isLoading ? (
                <Loader height='40vh' size='2.5vmax' />
              ) : (
                searchData?.map((item, index: number) => (
                  <Link href={`/anime/${item._id}`} key={index}>
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
                          <span className={styles.infoType}>Tên khác: </span>
                          {item.otherName?.join(', ') || 'n/a'}
                        </div>
                        <div className={styles.searchItemEpisode}>
                          <span className={styles.infoType}>Số tập: </span>{' '}
                          {(item.episode?.length || '?') + ' tập'}
                        </div>
                      </div>
                    </a>
                  </Link>
                ))
              )}
            </div>
          )}
          <button className={styles.iconButton} onClick={searchBarVisible}>
            <SearchRoundedIcon className={styles.icon} />
          </button>
        </div>
        <button className={styles.iconButton} onClick={searchBarVisible}>
          <CloseIcon className={styles.icon} />
        </button>
      </div>
    </header>
  );
};
export default HeaderBar;
