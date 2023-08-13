// Essentials
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';
// Type
import { _filmData, _episodeData } from '@/interface/_film';
//Style
import s from '../../styles/watch.module.scss';
import Error from '../../components/error/error';
import VideoControl from '../../components/videoControl/videoControl';
import Image from 'next/image';
import MainLayout from '../../layout/mainLayout/mainLayout';
import Loader from '../../components/loader/loader';
import { _videoConfig } from '@/interface/_videoPlayer';
import EpisodeList from '@/components/EpisodeList/EpisodeList';
import { TrashIcon } from '@/components/icons';
import useVideoControl from '@/hooks/useVideoControl';
import Head from 'next/head';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Watch() {
  const router = useRouter();
  const [server, setServer] = useState<string>();
  const [episodeData, setEpisodeData] = useState<_episodeData | undefined>();
  const [nextEpisodeId, setNextEpisodeId] = useState('');
  // const [watchData, setWatchData] = useState();

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
    // Get next episode id
    const currentIndex = episodeData && data?.episode.indexOf(episodeData);

    const nextId =
      currentIndex !== undefined &&
      data?.episode[
        currentIndex + 1 === data.episode.length ? 0 : currentIndex + 1
      ]._id;
    if (nextId) setNextEpisodeId(nextId);
  }, [data, episode, router.isReady]);

  const {
    //refs
    playerRef,
    playerContainerRef,
    controlRef,
    canvasRef,
    //states
    playing,
    muted,
    volume,
    playBackRate,
    played,
    elapsedTime,
    totalDuration,
    bookmarks,
    setBookmarks,
    //handler
    handlePlayPause,
    handleRewind,
    handleFastForward,
    handleMute,
    handleVolumeChange,
    handleVolumeSeekUp,
    handlePlayBackRateChange,
    handleToggleFullScreen,
    handleProgress,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleDuration,
    handleTimeDisplayFormat,
    addBookmark,
    handleOnMouseMove,
    handleMouseLeave,
    handleKeyDown,
  } = useVideoControl();
  if (error) return <Error />;
  if (!data) return <Loader />;
  return (
    <>
      <Head>
        <title>Watch {data.title} on Aspher</title>
        <meta
          name='description'
          content={`Latest episode: episode ${
            data.episode[data.episode.length - 1]?.name || 'trailer'
          } - ${data.desc}`}
        />
        <meta name='keywords' content='Watch, Films, Movies, Free' />
      </Head>
      <div className={s.Watch}>
        <div className={s.videoVideoList}>
          <div
            onMouseMove={handleOnMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={playerContainerRef}
            className={s.videoContainer}
          >
            <ReactPlayer
              className={s.video}
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
                  tracks: [
                    {
                      kind: 'subtitles',
                      src: episodeData?.subtitle || '',
                      srcLang: 'en',
                      default: false,
                      label: 'English',
                    },
                  ],
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
              handleKeyDown={handleKeyDown}
              nextEpisodeId={nextEpisodeId || ''}
            />
          </div>
          <div className={s.episodeData}>
            <h1>
              {data?.title}
              <span>{' EP ' + episodeData?.name}</span>
            </h1>
            {!data.isMovie && (
              <EpisodeList
                filmId={data._id}
                episodes={data.episode}
                selectId={episode as string}
              />
            )}
          </div>
        </div>
        <div className={s.bookmarkWrapper}>
          <p>Bookmarks list:</p>
          <div className={s.bookmark}>
            {bookmarks.map((bookmark, index) => (
              <div className={s.bookmarkItem} key={index}>
                <div
                  className={s.paper}
                  onClick={() => {
                    playerRef.current?.seekTo(bookmark.time);
                    if (!controlRef.current) return;
                    controlRef.current.style.display = 'flex';

                    setTimeout(() => {
                      if (!controlRef.current) return;
                      controlRef.current.style.display = 'none';
                    }, 1000);
                  }}
                >
                  <div className={s.bookmarkImg}>
                    <Image
                      className={s.img}
                      crossOrigin='anonymous'
                      src={bookmark.image}
                      alt={`Bookmarked at ${bookmark.display}`}
                      layout='fill'
                      objectFit='cover'
                    />
                    <span className={s.bookmarkTime}>{bookmark.display}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    // copy to avoid unintended behaviours
                    const copy = [...bookmarks];
                    copy.splice(index, 1);
                    setBookmarks(copy);
                  }}
                >
                  <TrashIcon className={s.icon} />
                </button>
              </div>
            ))}
          </div>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </>
  );
}
Watch.PageLayout = MainLayout;
