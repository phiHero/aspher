import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import { useEffect } from 'react';
import './videoListItem.scss';
import { ListReveal } from '../../animations/onScroll';

const VideoListItem = ({ item, data, container }) => {
  useEffect(() => {
    ListReveal(container);
  }, [container]);

  return (
    <Link
      id='sr-right-list'
      to={`/watch/${data._id}?espisode=${item.tap}`}
      className='espisode'
    >
      <div className='thumbnail'>
        <ReactPlayer
          className='react-player'
          width={null}
          height={null}
          url={item.url}
          playing={false}
        />
      </div>
      <div className='espisode-info'>
        <span>Tập {item.tap} </span>
        <span id='dash'>-</span>
      </div>
    </Link>
  );
};

export default VideoListItem;
