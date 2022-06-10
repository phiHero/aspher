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
import Popover from '@mui/material/Popover';
import SettingsIcon from '@mui/icons-material/Settings';

const VideoControl = ({
  data,
  episode,
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
  handleSetting,
}) => {
  function ValueLabelComponent(props) {
    const { children } = props;

    return (
      <Tooltip enterTouchDelay={0} placement='top' title={elapsedTime}>
        {children}
      </Tooltip>
    );
  }

  const [anchorEl, setAnchorEl] = useState(null);
  //Popover
  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'toc-do-popover' : undefined;

  return (
    <>
      <div className={styles.gridHeader}>
        <div></div>
        <div className={styles.videoTitle}>
          <h1>
            <span>T{episode + ': '}</span>
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
            <IconButton className={styles.footerButton} onClick={handleSetting}>
              <SettingsIcon />
            </IconButton>

            {/* <Button
              onClick={handlePopover}
              variant='text'
              className={styles.videoSpeed}
            >
              <Typography fontSize='inherit'>{playBackRate}x</Typography>
            </Button>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  background: '#151515',
                }}
              >
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate, index) => (
                  <Button
                    onClick={() => handlePlayBackRateChange(rate)}
                    variant='text'
                    key={index}
                  >
                    <Typography
                      color={rate === playBackRate ? 'white' : '#777a80'}
                      fontSize='inherit'
                    >
                      {rate}x
                    </Typography>
                  </Button>
                ))}
              </div>
            </Popover> */}

            <IconButton
              onClick={handleToggleFullScreen}
              className={styles.footerButton}
            >
              <FullscreenIcon fontSize='inherit' />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoControl;
