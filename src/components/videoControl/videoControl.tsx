import { KeyboardEventHandler, RefObject, useEffect, useState } from 'react';
// Style
import s from './videoControl.module.scss';
import IconButton from '@mui/material/IconButton';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Link from 'next/link';
import { _filmData } from '@/interface/_film';

const VideoControl = ({
  data,
  episodeData,
  handlePlayPause,
  playing,
  handleRewind,
  handleFastForward,
  muted,
  handleMute,
  onVolumeChange,
  handleVolumeSeekUp,
  volume,
  playBackRate,
  handlePlayBackRateChange,
  handleToggleFullScreen,
  played,
  onSeek,
  handleSeekMouseDown,
  handleSeekMouseUp,
  elapsedTime,
  totalDuration,
  handleTimeDisplayFormat,
  addBookmark,
  server,
  setServer,
  controlRef,
  handleKeyDown,
  nextEpisodeId,
}: {
  data: _filmData;
  episodeData: any;
  handlePlayPause: () => void;
  playing: boolean;
  handleRewind: () => void;
  handleFastForward: () => void;
  muted: boolean;
  handleMute: any;
  onVolumeChange: any;
  handleVolumeSeekUp: any;
  volume: number;
  playBackRate: number;
  handlePlayBackRateChange: any;
  handleToggleFullScreen: any;
  played: number;
  onSeek: any;
  handleSeekMouseDown: any;
  handleSeekMouseUp: any;
  elapsedTime: string;
  totalDuration: string;
  handleTimeDisplayFormat: () => void;
  addBookmark: any;
  server: any;
  setServer: any;
  controlRef: RefObject<HTMLDivElement>;
  handleKeyDown: any;
  nextEpisodeId: string;
}) => {
  function ValueLabelComponent({ children }: { children: React.ReactElement }) {
    return (
      <Tooltip enterTouchDelay={0} placement='top' title={elapsedTime}>
        {children}
      </Tooltip>
    );
  }

  const [setting, setSetting] = useState<boolean>(false);
  return (
    <div
      className={
        setting ? `${s.VideoControl} ${s.showSetting}` : s.VideoControl
      }
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={s.controlWrapper} ref={controlRef}>
        <div className={s.gridHeader}>
          <div></div>
          <div className={s.videoTitle}>
            <h1>
              <span>
                {!data?.isMovie && 'EP'} {episodeData?.name + ': '}
              </span>
              {data?.title}
            </h1>
          </div>
          <div className={s.bookmark}>
            <IconButton
              onClick={addBookmark}
              className={s.bookmarkButton}
              aria-label='reqind'
            >
              <BookmarkIcon fontSize='inherit' />
            </IconButton>
          </div>
        </div>
        <div className={s.gridBody}>
          <IconButton
            onClick={handleRewind}
            className={s.controlButton}
            aria-label='reqind'
          >
            <Replay10Icon fontSize='inherit' />
          </IconButton>
          <IconButton
            onClick={handlePlayPause}
            className={s.controlButton}
            aria-label='reqind'
          >
            {playing ? (
              <PauseIcon fontSize='inherit' />
            ) : (
              <PlayArrowIcon fontSize='inherit' />
            )}
          </IconButton>
          <IconButton
            onClick={handleFastForward}
            className={s.controlButton}
            aria-label='reqind'
          >
            <Forward10Icon fontSize='inherit' />
          </IconButton>
        </div>
        <div className={s.gridFooter}>
          <div className={s.progressBar}>
            <Slider
              valueLabelDisplay='auto'
              components={{
                ValueLabel: ValueLabelComponent,
              }}
              min={0}
              max={100}
              value={played * 100}
              onChange={onSeek}
              onMouseDown={handleSeekMouseDown}
              onChangeCommitted={handleSeekMouseUp}
            />
          </div>
          <div className={s.footerButtonWrapper}>
            <div className={s.footerButtonLeft}>
              <IconButton onClick={handlePlayPause} className={s.footerButton}>
                {playing ? (
                  <PauseIcon fontSize='inherit' />
                ) : (
                  <PlayArrowIcon fontSize='inherit' />
                )}
              </IconButton>
              <IconButton onClick={handleMute} className={s.footerButton}>
                {muted ? (
                  <VolumeOffIcon fontSize='inherit' />
                ) : (
                  <VolumeUp fontSize='inherit' />
                )}
              </IconButton>
              <Slider
                className={s.volumeSlider}
                aria-label='Volume'
                size='small'
                min={0}
                max={100}
                value={volume * 100}
                onChange={onVolumeChange}
                onChangeCommitted={handleVolumeSeekUp}
              />
              <Button
                onClick={handleTimeDisplayFormat}
                variant='text'
                className={s.time}
              >
                <Typography fontSize='inherit'>
                  {elapsedTime} / {totalDuration}
                </Typography>
              </Button>
            </div>
            <div className={s.footerButtonRight}>
              {data.episode.length > 1 && nextEpisodeId && (
                <Link
                  href={`/watch/${data._id}?episode=${nextEpisodeId}`}
                  shallow
                >
                  <IconButton className={s.footerButton}>
                    <SkipNextIcon fontSize='inherit' />
                  </IconButton>
                </Link>
              )}
              <IconButton
                className={s.footerButton}
                onClick={() => setSetting(!setting)}
              >
                <SettingsIcon fontSize='inherit' />
              </IconButton>
              <IconButton
                onClick={handleToggleFullScreen}
                className={s.footerButton}
              >
                <FullscreenIcon fontSize='inherit' />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      {setting && (
        <div className={s.setting}>
          <IconButton className={s.close} onClick={() => setSetting(!setting)}>
            <CloseIcon fontSize='inherit' />
          </IconButton>
          <div className={s.settingBody}>
            {/* <div className={s.server}>
              <span>Server: </span>
              <div className={s.option}>

                  <div
                    className={
                      server === ''
                        ? `${s.optionButton} ${s.active}`
                        : s.optionButton
                    }
                    onClick={() => setServer('')}
                  >
                    Thanos
                  </div>
                  <div
                    className={
                      server === ''
                        ? `${s.optionButton} ${s.active}`
                        : s.optionButton
                    }
                    onClick={() => setServer('')}
                  >
                    Excon
                  </div>
                )}
              </div>
            </div> */}
            <div className={s.playbackRate}>
              <span>Speed: </span>
              <div className={s.option}>
                {[0.5, 0.75, 1, 1.25, 1.5, 1.75].map((rate, index) => (
                  <div
                    className={
                      rate === playBackRate
                        ? `${s.optionButton} ${s.active}`
                        : s.optionButton
                    }
                    onClick={() => handlePlayBackRateChange(rate)}
                    key={index}
                  >
                    {rate}x
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoControl;
