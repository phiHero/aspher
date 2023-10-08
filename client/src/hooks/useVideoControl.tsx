// Essentials
import {
  useEffect,
  useState,
  useRef,
  LegacyRef,
  MutableRefObject,
  KeyboardEventHandler,
} from 'react';
// Type
import { _filmData, _episodeData } from '@/interface/_film';
//Style

import { _videoConfig } from '@/interface/_videoPlayer';
import type ReactPlayer from 'react-player';

type _bookmark = {
  time: number;
  display: string;
  image: string;
};
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

export default function useVideoControl() {
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const countDown = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal');
  const [bookmarks, setBookmarks] = useState<_bookmark[]>([]);
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

  // Video player features
  const handlePlayPause = () => {
    setVideoConfig({
      ...videoConfig,
      playing: !playing,
    });
  };
  const handleRewind = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFastForward = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10);
  };
  const handleMute = () => {
    setVideoConfig({
      ...videoConfig,
      muted: !muted,
    });
  };
  const handleVolumeChange = (e: never, newValue: number) => {
    setVideoConfig({
      ...videoConfig,
      volume: newValue / 100,
      muted: newValue === 0 ? true : false,
    });
  };
  const handleVolumeSeekUp = (e: never, newValue: number) => {
    setVideoConfig({
      ...videoConfig,
      volume: newValue / 100,
      muted: newValue === 0 ? true : false,
    });
  };
  const handlePlayBackRateChange = (rate: number) => {
    setVideoConfig((prevState) => ({ ...prevState, playBackRate: rate }));
  };
  const handleToggleFullScreen = async () => {
    const screenfull = (await import('screenfull')).default;
    playerContainerRef.current && screenfull.toggle(playerContainerRef.current);
  };
  const handleProgress = (changeState: any) => {
    if (countDown.current >= 1) {
      controlRef.current && (controlRef.current.style.display = 'none');
      countDown.current = 0;
    }
    if (controlRef.current && controlRef.current.style.display === 'flex') {
      countDown.current++;
    }
    if (!seeking) {
      setVideoConfig({ ...videoConfig, ...changeState });
    }
  };

  const handleSeekChange = (e: never, newValue: number) => {
    setVideoConfig({
      ...videoConfig,
      played: newValue / 100,
      seeking: true,
    });
  };
  const handleSeekMouseDown = () => {
    setVideoConfig({ ...videoConfig, seeking: true });
  };
  const handleSeekMouseUp = (e: never, newValue: number) => {
    setVideoConfig({ ...videoConfig, seeking: false });
    playerRef.current?.seekTo(newValue / 100, 'fraction');
  };
  const handleDuration = (duration: number) => {
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
    if (!playerRef.current) return;

    ctx?.drawImage(
      playerRef.current.getInternalPlayer() as CanvasImageSource,
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
  const handleMouseLeave = () => {
    if (!controlRef.current) return;
    controlRef.current.style.display = 'none';
    countDown.current = 0;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const handler: any = {
      Space: handlePlayPause,
      ArrowRight: handleFastForward,
      ArrowLeft: handleRewind,
    };

    handler[e.code]?.call();
  };

  return {
    playerRef,
    playerContainerRef,
    controlRef,
    canvasRef,
    playing,
    muted,
    volume,
    playBackRate,
    played,
    seeking,
    duration,
    elapsedTime,
    totalDuration,
    bookmarks,
    setBookmarks,
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
  };
}
