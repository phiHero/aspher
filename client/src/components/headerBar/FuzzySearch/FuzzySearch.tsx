import s from './FuzzySearch.module.scss';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
//@ts-ignore
import debounce from 'lodash.debounce';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../../loader/loader';

export default function FuzzySearch({
  searchBarVisible,
  searchBarRef,
  display,
  setDisplay,
}: {
  searchBarVisible: () => void;
  searchBarRef: RefObject<HTMLInputElement>;
  display: boolean;
  setDisplay: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean | 'No data'>(false);

  const fetcher = async (query: string) => {
    try {
      const { data } = await axios.post(`/api/film/search?q=${query}`);
      setSearchData(data);
      if (data?.length) {
        setIsLoading(false);
      } else {
        setIsLoading('No data');
      }
    } catch (error) {
      alert('Error!');
      setIsLoading(false);
    }
  };
  const getSearchResult = useCallback(debounce(fetcher, 1000), []);
  const getSearchResultOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let query: string = e.target.value.trim();
    if (query.length > 2) {
      setIsLoading(true);
      getSearchResult(query);
    } else {
      setIsLoading(false);
      setSearchData([]);
    }
  };
  return (
    <div className={s.FuzzySearch} ref={searchBarRef} data-testid='FuzzySearch'>
      <div></div>
      <div className={s.search}>
        <button
          className={s.iconButton}
          onClick={searchBarVisible}
          aria-label='Search'
        >
          <SearchRoundedIcon className={s.icon} />
        </button>
        <input
          type='text'
          placeholder='Search films...'
          onChange={(e) => getSearchResultOnChange(e)}
          onFocus={() => setDisplay(true)}
        />

        {display && (
          <div className={s.searchResult}>
            {isLoading === true ? (
              <Loader height='40vh' size='2.5vmax' />
            ) : isLoading === 'No data' ? (
              <div id={s.noData}>Sorry, no data found!</div>
            ) : (
              searchData?.map((item: any, index: number) => (
                <Link href={`/film/${item._id}`} key={index}>
                  <a
                    className={s.searchItem}
                    onClick={searchBarVisible}
                    data-testid='searchItem'
                  >
                    <div className={s.searchItemBgWrapper}>
                      <Image
                        className={s.searchItemImg}
                        src={item.backgroundImg}
                        layout='fill'
                        objectFit='cover'
                        alt={item.title + ' background image.'}
                      />
                    </div>
                    <div className={s.searchItemDetail}>
                      <h1 className={s.searchItemTitle}>{item.title}</h1>
                      <div className={s.searchItemOtherName}>
                        <span className={s.infoType}>Other name: </span>
                        {item.otherName || 'none'}
                      </div>
                      <div className={s.searchItemEpisode}>
                        <span className={s.infoType}>Number of episodes: </span>{' '}
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
        className={s.iconButton}
        onClick={searchBarVisible}
        aria-label='Close search'
      >
        <CloseIcon className={s.icon} />
      </button>
    </div>
  );
}
