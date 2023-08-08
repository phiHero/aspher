// Essentials
import { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';
import Link from 'next/link';
// Type
import { _filmData, _episodeData } from '@/interface/_film';
//Style
import styles from '../../styles/watch.module.scss';
import Error from '../../components/error/error';
import VideoControl from '../../components/videoControl/videoControl';
import Image from 'next/image';
import MainLayout from '../../layout/mainLayout/mainLayout';
import Loader from '../../components/loader/loader';
import { _videoConfig } from '@/interface/_props';

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

export default function Watch() {
  const router = useRouter();
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLElement | null>(null);
  const controlRef = useRef<HTMLDivElement | undefined>(undefined);
  const countDown = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [server, setServer] = useState<string>();
  const [episodeData, setEpisodeData] = useState<_episodeData | undefined>();
  const [watchData, setWatchData] = useState();
  const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal');
  const [bookmarks, setBookmarks] = useState([]);
  const [videoConfig, setVideoConfig] = useState<_videoConfig>({
    playing: false,
    muted: false,
    volume: 1,
    playBackRate: 1.0,
    played: 0,
    seeking: false,
    duration: 0,
  });

  const { playing, muted, volume, playBackRate, played, seeking, duration } =
    videoConfig;
  // Dealing with anime data
  const { episode } = router.query;
  const { data, error } = useSWR<_filmData, any>(
    router.isReady && `/api/film/watch/${router.query.filmId}`,
    fetcher
  );

  // set current watching episode
  useEffect(() => {
    if (!router.isReady) return;
    let episodeData = data?.episode.filter(
      (item: _episodeData) => item._id === episode
    )[0];

    setEpisodeData(episodeData);
  }, [data, episode, router.isReady]);

  if (error) return <Error />;
  if (!data) return <Loader />;
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
    if (countDown.current >= 2) {
      controlRef.current.style.display = 'none';
      countDown.current = 0;
    }
    if (controlRef.current.style.display === 'flex') {
      countDown.current++;
    }
    if (!seeking) {
      setVideoConfig((prevState) => ({ ...prevState, ...changeState }));
    }
  };

  const handleSeekChange = (e, newValue: number) => {
    setVideoConfig({
      ...videoConfig,
      played: parseFloat(newValue / 100),
      seeking: true,
    });
  };
  const handleSeekMouseDown = () => {
    setVideoConfig({ ...videoConfig, seeking: true });
  };
  const handleSeekMouseUp = (e, newValue: number) => {
    setVideoConfig({ ...videoConfig, seeking: false });
    playerRef.current.seekTo(newValue / 100, 'fraction');
  };
  const handleDuration = (duration) => {
    setVideoConfig({ ...videoConfig, duration: duration });
  };
  const handleTimeDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === 'normal' ? 'remaining' : 'normal'
    );
  };
  const addBookmark = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 858;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      playerRef.current?.getInternalPlayer(),
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
  const currentTime = duration * played;
  const elapsedTime =
    timeDisplayFormat == 'normal'
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  const handleOnMouseMove = () => {
    if (!controlRef.current) return;
    controlRef.current.style.display = 'flex';
    countDown.current = 0;
  };
  const hanldeMouseLeave = () => {
    if (!controlRef.current) return;
    controlRef.current.style.display = 'none';
    countDown.current = 0;
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
            // 5/30/2022
            url={episodeData?.video}
            width={''}
            height={''}
            controls={false}
            playing={playing}
            muted={muted}
            volume={volume}
            playbackRate={playBackRate}
            onProgress={handleProgress}
            onError={(err) => console.log(err)}
            onDuration={handleDuration}
            config={{
              file: {
                attributes: {
                  crossOrigin: 'anonymous',
                },
              },
              dailymotion: {
                params: {
                  loop: true,
                  uiLogo: false,
                },
              },
            }}
          />

          <VideoControl
            controlRef={controlRef}
            data={data}
            episodeData={episodeData}
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
            server={server}
            setServer={setServer}
          />
        </div>
        <div className={styles.episodeData}>
          <h1>
            {data?.title}
            <span>{' EP ' + episodeData?.name}</span>
          </h1>
          <div className={styles.episodeList}>
            {data.episode.map((item: _episodeData) => (
              <Link
                href={`/watch/${data._id}?episode=${item._id}`}
                key={item._id}
                shallow
              >
                <a
                  className={
                    episode === item._id
                      ? `${styles.episodeLink} ${styles.active}`
                      : styles.episodeLink
                  }
                  id='sr-bottom-episode-delay'
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bookmarkWrapper}>
        <p>Danh sách đánh dấu:</p>
        <div className={styles.bookmark}>
          {bookmarks.map((bookmark, index) => (
            <div className={styles.bookmarkItem} key={index}>
              <div
                className={styles.paper}
                onClick={() => {
                  playerRef.current.seekTo(bookmark.time);
                  controlRef.current.style.display = 'flex';

                  setTimeout(() => {
                    controlRef.current.style.display = 'none';
                  }, 1000);
                }}
              >
                <div className={styles.bookmarkImg}>
                  <Image
                    className={styles.img}
                    crossOrigin='anonymous'
                    src={bookmark.image}
                    alt={`Đánh dấu lúc ${bookmark.display}`}
                    layout='fill'
                    objectFit='cover'
                  />
                  <span className={styles.bookmarkTime}>
                    {bookmark.display}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
Watch.PageLayout = MainLayout;
