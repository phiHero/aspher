import s from './FuzzySearch.module.scss';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Loader from '../loader/loader';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { _setPassingSearchData } from '@/interface/_custom';
import debounce from 'lodash.debounce';

export default function FuzzySearch({
  setPassingSearchData,
}: {
  setPassingSearchData: _setPassingSearchData;
}) {
  const [searchData, setSearchData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean | 'No data'>(false);
  const searchBarVisible = () => {
    setDisplay(false);
  };
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
    <div className={s.FuzzySearch}>
      <input
        type='text'
        placeholder='Search films...'
        onChange={(e) => getSearchResultOnChange(e)}
        onFocus={() => setDisplay(true)}
      />
      <button className={s.iconButton} onClick={searchBarVisible}>
        <SearchRoundedIcon className={s.icon} />
      </button>

      {display && (
        <div className={s.searchResult}>
          {isLoading === true ? (
            <Loader height='40vh' size='2.5vmax' />
          ) : isLoading === 'No data' ? (
            'No data found!'
          ) : (
            searchData?.map((item: any, index: number) => (
              <div
                className={s.searchItem}
                onClick={() => {
                  setPassingSearchData(item);
                  searchBarVisible();
                  // navigator.clipboard.writeText(item._id);
                }}
                key={index}
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
                    {item.otherName || 'n/a'}
                  </div>
                  <div className={s.searchItemEpisode}>
                    <span className={s.infoType}>Number of episodes: </span>{' '}
                    {(item.episode?.length || '?') + ' EP'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
