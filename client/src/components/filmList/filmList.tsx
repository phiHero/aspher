// Essentials
import { useEffect, useRef, useState } from 'react';
// Types
import { _filmData, _filmListItem } from '@/interface/_film';

// Styles
import s from './filmList.module.scss';
import FilmListItems from './filmListItem/filmListItem';

let options = {
  rootMargin: '0px',
  threshold: 0.3,
};

const FilmList = ({ data }: { data: _filmData[] }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) ob.unobserve(entry.target);
      });
    }, options);
    if (listRef.current) {
      ob.observe(listRef.current);
    }
  }, []);

  useEffect(() => {
    if (!inView || !listRef.current) return;
    const children = listRef.current.childNodes;

    const delay = window.innerWidth > 900 ? 0 : 1600;

    for (let i = 0; i < children.length; i++) {
      (children[i] as HTMLAnchorElement).animate(
        [
          {
            opacity: 0,
          },

          {
            opacity: 1,
          },
        ],
        {
          duration: 1200,
          fill: 'forwards',
          delay: i * 150 + delay,
        }
      );
    }
  }, [inView]);

  return (
    <div className={s.FilmList} ref={listRef}>
      {data?.map((item, index: number) => {
        return <FilmListItems key={index} item={item} />;
      })}
    </div>
  );
};

export default FilmList;
