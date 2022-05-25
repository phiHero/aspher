// Essentials
import { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';
import cheerio from 'cheerio';
import ReactPlayer from 'react-player/lazy';
// Type
import { _data, _episodeData, _videoConfig } from '../../interface/_custom';
//Style
import styles from '../../styles/watch.module.scss';
import Error from '../../components/error/error';
import VideoItem from '../../components/videoItem/videoItem';
import VideoControl from '../../components/videoControl/videoControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import MainLayout from '../../layout/mainLayout/mainLayout';
import Loader from '../../components/loader/loader';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const format = (seconds: number) => {
  if (isNaN(seconds)) {
    return '00:00';
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
};
const getURL = async (url: string) => {
  try {
    const res = await axios.post('/api/anime/watch/', { url: url });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default function Watch() {
  const router = useRouter();
  const playerRef = useRef<HTMLElement | null>(null);
  const playerContainerRef = useRef<HTMLElement | null>(null);
  const controlRef = useRef<HTMLDivElement | undefined>(undefined);
  const countDown = useRef<number>(0);
  const canvasRef = useRef<HTMLElement | null>(null);

  const [episodeData, setEpisodeData] = useState<_episodeData | undefined>();
  const [watchData, setWatchData] = useState();
  const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal');
  const [bookmarks, setBookmarks] = useState([]);
  const [videoConfig, setVideoConfig] = useState<_videoConfig>({
    playing: true,
    muted: false,
    volume: 1,
    playBackRate: 1.0,
    played: 0,
    seeking: false,
  });
  const { playing, muted, volume, playBackRate, played, seeking } = videoConfig;
  // Dealing with anime data
  const { episode } = router.query;
  const { data, error } = useSWR<_data, any>(
    router.isReady && `/api/anime/watch/${router.query.animeId}`,
    fetcher
  );
  useEffect(() => {
    if (!router.isReady) return;
    const episodeData = data?.episode.filter((item) => item._id === episode);
    setEpisodeData(episodeData);
    if (episodeData?.[0].url) {
      const get = async () => {
        const wData = await getURL(episodeData?.[0].url);
        setWatchData(wData);
      };
      get();
    }
  }, [data, episode, router.isReady]);

  if (error) return <Error />;
  if (!data || !watchData) return <Loader />;
  // Video player features
  const handlePlayPause = () => {
    setVideoConfig((prevState) => ({
      ...prevState,
      playing: !playing,
    }));
  };
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };
  const handleMute = () => {
    setVideoConfig((prevState) => ({
      ...prevState,
      muted: !muted,
    }));
  };
  const handleVolumeChange = (e, newValue: number) => {
    setVideoConfig((prevState) => ({
      ...prevState,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    }));
  };
  const handleVolumeSeekUp = (e, newValue: number) => {
    setVideoConfig((prevState) => ({
      ...prevState,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    }));
  };
  const handlePlayBackRateChange = (rate) => {
    setVideoConfig((prevState) => ({ ...prevState, playBackRate: rate }));
  };
  const handleToggleFullScreen = async () => {
    const screenfull = await (await import('screenfull')).default;
    screenfull.toggle(playerContainerRef.current);
  };
  const handleProgress = (changeState) => {
    if (countDown.current >= 3) {
      controlRef.current.style.visibility = 'hidden';
      countDown.current = 0;
    }
    if (controlRef.current.style.visibility === 'visible') {
      countDown.current++;
    }
    if (!seeking) {
      setVideoConfig((prevState) => ({ ...prevState, ...changeState }));
    }
  };
  const handleSeekChange = (e, newValue: number) => {
    setVideoConfig({ ...videoConfig, played: parseFloat(newValue / 100) });
    playerRef.current.seekTo(newValue / 100, 'fraction');
  };

  const handleSeekMouseDown = () => {
    setVideoConfig({ ...videoConfig, seeking: true });
  };

  const handleSeekMouseUp = () => {
    setVideoConfig({ ...videoConfig, seeking: false });
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : '00:00';
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : '00:00';

  const elapsedTime =
    timeDisplayFormat === 'normal'
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);

  const handleTimeDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === 'normal' ? 'remaining' : 'normal'
    );
  };
  const handleOnMouseMove = () => {
    controlRef.current.style.visibility = 'visible';
    countDown.current = 0;
  };
  const hanldeMouseLeave = () => {
    controlRef.current.style.visibility = 'hidden';
    countDown.current = 0;
  };
  const addBookmark = () => {
    const canvas = canvasRef.current;
    canvas.width = 160;
    canvas.height = 90;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      playerRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height
    );
    const dataUri = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;
    const bookmarksCopy = [...bookmarks];
    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
      image: dataUri,
    });
    setBookmarks(bookmarksCopy);
  };
  return (
    <div className={styles.Watch}>
      <div className={styles.videoVideoList}>
        <div
          onMouseMove={handleOnMouseMove}
          onMouseLeave={hanldeMouseLeave}
          ref={playerContainerRef}
          className={styles.videoContainer}
        >
          <ReactPlayer
            className={styles.video}
            ref={playerRef}
            url={'/api/' + encodeURIComponent(watchData?.video)}
            width={''}
            height={''}
            playing={playing}
            muted={muted}
            volume={volume}
            playbackRate={playBackRate}
            onProgress={handleProgress}
            onError={(err) => console.log(err)}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'anonymous',
                },
              },
            }}
          />
          <div ref={controlRef} className={styles.VideoControl}>
            <VideoControl
              data={data}
              episode={episodeData?.[0].tap}
              playing={playing}
              handlePlayPause={handlePlayPause}
              handleRewind={handleRewind}
              handleFastForward={handleFastForward}
              muted={muted}
              handleMute={handleMute}
              onVolumeChange={handleVolumeChange}
              handleVolumeSeekUp={handleVolumeSeekUp}
              volume={volume}
              playBackRate={playBackRate}
              handlePlayBackRateChange={handlePlayBackRateChange}
              handleToggleFullScreen={handleToggleFullScreen}
              played={played}
              onSeek={handleSeekChange}
              handleSeekMouseDown={handleSeekMouseDown}
              handleSeekMouseUp={handleSeekMouseUp}
              elapsedTime={elapsedTime}
              totalDuration={totalDuration}
              handleTimeDisplayFormat={handleTimeDisplayFormat}
              addBookmark={addBookmark}
            />
          </div>
        </div>

        <div className={styles.videoListContainer}>
          <div className='sectionTitle' id={styles.sectionTitle}>
            <p id='sr-right'>Danh sách các tập</p>
            <div id='sr-right' className='underBar1'></div>
            <div id='sr-right' className='underBar2'></div>
          </div>
          <div className={styles.videoList}>
            {data?.episode.map((item, index) => (
              <VideoItem
                item={item}
                animeId={data?._id}
                key={index}
                container='.video-list'
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.titleBookmark}>
        <h1>
          {data?.title}
          <span>{' tập ' + episodeData?.[0].tap}</span>
        </h1>
        <p>Danh sách đánh dấu:</p>
        <div className={styles.bookmark}>
          {bookmarks.map((bookmark, index) => (
            <div className={styles.bookmarkItem} key={index}>
              <Paper
                className={styles.paper}
                onClick={() => {
                  playerRef.current.seekTo(bookmark.time);
                  controlRef.current.style.visibility = 'visible';

                  setTimeout(() => {
                    controlRef.current.style.visibility = 'hidden';
                  }, 1000);
                }}
                elevation={3}
              >
                <div className={styles.bookmarkImg}>
                  <Image
                    crossOrigin='anonymous'
                    src={bookmark.image}
                    alt={`Đánh dấu lúc ${bookmark.display}`}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
                <Typography color={'#777a80'} variant='body2' align='center'>
                  Đánh dấu lúc {bookmark.display}
                </Typography>
              </Paper>
            </div>
          ))}
        </div>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
Watch.PageLayout = MainLayout;
