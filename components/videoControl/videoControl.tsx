import { useState } from 'react';
// Style
import styles from './videoControl.module.scss';
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
}: {
  data: any;
  episodeData: any;
  handlePlayPause: any;
  playing: boolean;
  handleRewind: any;
  handleFastForward: any;
  muted: boolean;
  handleMute: any;
  onVolumeChange: any;
  handleVolumeSeekUp: any;
  volume: number;
  playBackRate: any;
  handlePlayBackRateChange: any;
  handleToggleFullScreen: any;
  played: number;
  onSeek: any;
  handleSeekMouseDown: any;
  handleSeekMouseUp: any;
  elapsedTime: string;
  totalDuration: string;
  handleTimeDisplayFormat: any;
  addBookmark: any;
  server: any;
  setServer: any;
  controlRef: HTMLDivElement;
}) => {
  function ValueLabelComponent(props) {
    const { children } = props;

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
        setting
          ? `${styles.VideoControl} ${styles.showSetting}`
          : styles.VideoControl
      }
    >
      <div className={styles.controlWrapper} ref={controlRef}>
        <div className={styles.gridHeader}>
          <div></div>
          <div className={styles.videoTitle}>
            <h1>
              <span>T{episodeData.tap + ': '}</span>
              {data?.title}
            </h1>
          </div>
          <div className={styles.bookmark}>
            <IconButton
              onClick={addBookmark}
              className={styles.bookmarkButton}
              aria-label='reqind'
            >
              <BookmarkIcon fontSize='inherit' />
            </IconButton>
          </div>
        </div>
        <div className={styles.gridBody}>
          <IconButton
            onClick={handleRewind}
            className={styles.controlButton}
            aria-label='reqind'
          >
            <Replay10Icon fontSize='inherit' />
          </IconButton>
          <IconButton
            onClick={handlePlayPause}
            className={styles.controlButton}
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
            className={styles.controlButton}
            aria-label='reqind'
          >
            <Forward10Icon fontSize='inherit' />
          </IconButton>
        </div>
        <div className={styles.gridFooter}>
          <div className={styles.progressBar}>
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
          <div className={styles.footerButtonWrapper}>
            <div className={styles.footerButtonLeft}>
              <IconButton
                onClick={handlePlayPause}
                className={styles.footerButton}
              >
                {playing ? (
                  <PauseIcon fontSize='large' />
                ) : (
                  <PlayArrowIcon fontSize='large' />
                )}
              </IconButton>
              <IconButton onClick={handleMute} className={styles.footerButton}>
                {muted ? (
                  <VolumeOffIcon fontSize='inherit' />
                ) : (
                  <VolumeUp fontSize='inherit' />
                )}
              </IconButton>
              <Slider
                className={styles.volumeSlider}
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
                className={styles.time}
              >
                <Typography fontSize='inherit'>
                  {elapsedTime} / {totalDuration}
                </Typography>
              </Button>
            </div>
            <div className={styles.footerButtonRight}>
              <IconButton
                className={styles.footerButton}
                onClick={() => setSetting(!setting)}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                onClick={handleToggleFullScreen}
                className={styles.footerButton}
              >
                <FullscreenIcon fontSize='inherit' />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      {setting && (
        <div className={styles.setting}>
          <IconButton
            className={styles.close}
            onClick={() => setSetting(!setting)}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
          <div className={styles.settingBody}>
            <div className={styles.server}>
              <span>Máy chủ: </span>
              <div className={styles.option}>
                {episodeData.fbID && (
                  <div
                    className={
                      server === 'FB'
                        ? `${styles.optionButton} ${styles.active}`
                        : styles.optionButton
                    }
                    onClick={() => setServer('FB')}
                  >
                    Thanos
                  </div>
                )}
                {episodeData.dlID && (
                  <div
                    className={
                      server === 'DL'
                        ? `${styles.optionButton} ${styles.active}`
                        : styles.optionButton
                    }
                    onClick={() => setServer('Dl')}
                  >
                    Excon
                  </div>
                )}
              </div>
            </div>
            <div className={styles.playbackRate}>
              <span>Tốc độ: </span>
              <div className={styles.option}>
                {[0.25, 0.75, 1, 1.25, 1.5].map((rate, index) => (
                  <div
                    className={
                      rate === playBackRate
                        ? `${styles.optionButton} ${styles.active}`
                        : styles.optionButton
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
