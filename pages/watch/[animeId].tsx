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
  const [lightMode, setLightMode] = useState(true);
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
            // 5/30/2022
            url={
              'https://video.fdad1-3.fna.fbcdn.net/v/t39.25447-2/284714171_3171697789735864_5172591483775649094_n.mp4?_nc_cat=1&vs=2df5faaee7044bf8&_nc_vs=HBksFQAYJEdMdGtfQkM0a3hkd3BFUUxBRWFGcUlhTXZNaEhibWRqQUFBRhUAAsgBABUAGCRHTjFiQVJFOEU4eGlqZThCQU9DVUt1eTdQUlllYnJGcUFBQUYVAgLIAQBLBogScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcAAAm6vGmxrrfvgIVAigCQzMYC3Z0c19wcmV2aWV3HBdAeaV87ZFocxggZGFzaF92NF81c2VjZ29wX2hxMV9mcmFnXzJfdmlkZW8SABgYdmlkZW9zLnZ0cy5jYWxsYmFjay5wcm9kOBJWSURFT19WSUVXX1JFUVVFU1QbCogVb2VtX3RhcmdldF9lbmNvZGVfdGFnBm9lcF9oZBNvZW1fcmVxdWVzdF90aW1lX21zATAMb2VtX2NmZ19ydWxlB3VubXV0ZWQTb2VtX3JvaV9yZWFjaF9jb3VudAU5MjEzMxFvZW1faXNfZXhwZXJpbWVudAAMb2VtX3ZpZGVvX2lkDzU4ODM2ODM3MjQ4MTcyNRJvZW1fdmlkZW9fYXNzZXRfaWQPNzYyNjAwMjYxNzc1MjE3FW9lbV92aWRlb19yZXNvdXJjZV9pZA83MDA5MjkzNDExODUxNDEcb2VtX3NvdXJjZV92aWRlb19lbmNvZGluZ19pZBAzMTYzMzQxNDEzOTE0MjA1DnZ0c19yZXF1ZXN0X2lkACUCHAAlxAEbB4gBcwQxNDEwAmNkCjIwMjItMDUtMzADcmNiBTkyMTAwA2FwcAVWaWRlbwJjdBlDT05UQUlORURfUE9TVF9BVFRBQ0hNRU5UE29yaWdpbmFsX2R1cmF0aW9uX3MKNDEwLjM4OTMzMwJ0cxVwcm9ncmVzc2l2ZV9lbmNvZGluZ3MA&ccb=1-7&_nc_sid=9489be&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=I15sF1mY4HsAX_downa&_nc_ht=video.fdad1-3.fna&oh=00_AT_xh7IaJ4dobWzONQ3XqgvIpMZL1EhDxQfwk0sEgftzwA&oe=629D4760&_nc_rid=7879996868872835'
            }
            //   light={watchData?.thumbnail}
            width={''}
            height={''}
            playing={playing}
            //onStart={() => setLightMode(false)}
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
          {/* <video
            className={styles.video}
            src=''
          /> */}
          {/* {!lightMode && ( */}
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
