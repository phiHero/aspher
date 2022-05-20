import { useState } from 'react';
// STyle
import './videoControl.scss';
import IconButton from '@mui/material/IconButton';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
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

const VideoControl = ({
  desc,
  playing_esp,
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
      <div className='grid-header'>
        <div className='video-title'>
          <h1>{desc.title + ' tập ' + playing_esp}</h1>
        </div>
        <div className='bookmark'>
          <IconButton
            onClick={addBookmark}
            className='bookmark-button'
            aria-label='reqind'
          >
            <BookmarkIcon fontSize='inherit' />
          </IconButton>
        </div>
      </div>
      <div className='grid-body'>
        <IconButton
          onClick={handleRewind}
          className='control-button'
          aria-label='reqind'
        >
          <FastRewindIcon fontSize='inherit' />
        </IconButton>

        <IconButton
          onClick={handlePlayPause}
          className='control-button'
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
          className='control-button'
          aria-label='reqind'
        >
          <FastForwardIcon fontSize='inherit' />
        </IconButton>
      </div>
      <div className='grid-footer'>
        <div className='progress-bar'>
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
        <div className='footer-button-wrapper'>
          <div className='footer-button-left'>
            <IconButton onClick={handlePlayPause} className='footer-button'>
              {playing ? (
                <PauseIcon fontSize='large' />
              ) : (
                <PlayArrowIcon fontSize='large' />
              )}
            </IconButton>

            <IconButton onClick={handleMute} className='footer-button'>
              {muted ? (
                <VolumeOffIcon fontSize='inherit' />
              ) : (
                <VolumeUp fontSize='inherit' />
              )}
            </IconButton>
            <Slider
              className='volume-slider'
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
              className='time'
            >
              <Typography fontSize='inherit'>
                {elapsedTime} / {totalDuration}
              </Typography>
            </Button>
          </div>
          <div className='footer-button-right'>
            <Button
              onClick={handlePopover}
              variant='text'
              className='video-speed'
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
            </Popover>

            <IconButton
              onClick={handleToggleFullScreen}
              className='footer-button'
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
