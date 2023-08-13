import { _episodeData } from '@/interface/_film';
import s from './EpisodeList.module.scss';
import Link from 'next/link';

export default function EpisodeList({
  filmId,
  episodes,
  selectId,
}: {
  filmId: string;
  episodes: _episodeData[];
  selectId?: string;
}) {
  return (
    <section className={s.EpisodeList} id='episodeList'>
      {episodes.map((item: _episodeData) => (
        <Link
          href={`/watch/${filmId}?episode=${item._id}`}
          key={item._id}
          shallow
        >
          <a
            className={
              selectId === item._id
                ? `${s.episodeLink} ${s.active}`
                : s.episodeLink
            }
          >
            {item.name}
          </a>
        </Link>
      ))}
    </section>
  );
}
