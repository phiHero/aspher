// Essentials
import { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';
import Link from 'next/link';
// Type
import { _data, _episodeData, _videoConfig } from '../../interface/_custom';
//Style
import styles from '../../styles/watch.module.scss';
import Error from '../../components/error/error';
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
const FBFetcher = async (fbID: string) => {
  try {
    const res = await axios.post('/api/anime/watch/', { fbID: fbID });
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
  const { data, error } = useSWR<_data, any>(
    router.isReady && `/api/anime/watch/${router.query.animeId}`,
    fetcher
  );

  // Initializing basic data
  useEffect(() => {
    if (!router.isReady) return;
    let episodeData = data?.episode.filter((item) => item._id === episode)[0];
    setEpisodeData(episodeData);
    if (episodeData?.fbID) {
      setServer('FB');
    } else if (episodeData?.dlID) {
      setServer('DL');
    }
  }, [data, episode, router.isReady]);

  // Get video data
  useEffect(() => {
    if (server === 'FB') {
      const get = async () => {
        let wData = await FBFetcher(episodeData?.fbID);
        setWatchData(wData);
      };
      get();
    } else if (server === 'DL') {
      setWatchData(episodeData?.dlID);
    }
  }, [episodeData, server]);

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
    console.log(changeState);
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
  console.log('video +' + videoConfig);

  const handleSeekChange = (e, newValue: number) => {
    setVideoConfig({ ...videoConfig, played: parseFloat(newValue / 100) });
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
  const currentTime = duration * played;
  const elapsedTime =
    timeDisplayFormat == 'normal'
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  // const handleOnMouseMove = () => {
  //   controlRef.current.style.visibility = 'visible';
  //   countDown.current = 0;
  // };
  // const hanldeMouseLeave = () => {
  //   controlRef.current.style.visibility = 'hidden';
  //   countDown.current = 0;
  // };

  return (
    <div className={styles.Watch}>
      <div className={styles.videoVideoList}>
        <div
          // onMouseMove={handleOnMouseMove}
          // onMouseLeave={hanldeMouseLeave}
          ref={playerContainerRef}
          className={styles.videoContainer}
        >
          <ReactPlayer
            className={styles.video}
            ref={playerRef}
            // 5/30/2022
            url={
              (watchData.hd?.includes('/v/t39') && watchData.hd) ||
              watchData.hd_nr ||
              watchData.hd ||
              watchData.sd_nr ||
              watchData.sd ||
              'https://www.dailymotion.com/embed/video/' + watchData
            }
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
            <span>{' tập ' + episodeData.tap}</span>
          </h1>
          <div className={styles.episodeList}>
            {data.episode.map((item, index) => (
              <Link
                href={`/watch/${data._id}?episode=${item._id}`}
                key={index}
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
                  {item.tap}
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
