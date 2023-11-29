import React, {useEffect, useState} from 'react';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {formatTime} from '../common/ConvertTime';
const AudioHelper = ({audio}) => {
  const [player, setPlayer] = React.useState(null);
  const {duration, position} = useProgress();
  const [currentTime, setCurrentTime] = useState(0);
  const [status, setStatus] = useState('loading');
  const [onChangeValueProgress, setOnChangeValueProgress] = useState(false);
  const [onSlidingComplete, setOnSlidingComplete] = useState(false);
  const initial = async () => {
    setStatus('loading');

    await TrackPlayer.setupPlayer();

    await TrackPlayer.add({
      id: 1,
      url: audio,
      duration: duration,
    });
    setPlayer(TrackPlayer);
  };
  useEffect(() => {
    initial();
  }, []);

  const playTrack = () => {
    player.play();
    setStatus('play');
  };

  const pause = () => {
    player.pause();

    setStatus('pause');
  };

  const stop = () => {
    player.stop();
    setStatus('stop');
  };

  const getCurrentTime = time => {
    return formatTime(time);
  };

  const prevBtn = () => {
    setOnChangeValueProgress(true);

    setCurrentTime(prev => prev - 15);
    player.seekTo(currentTime);
    setOnChangeValueProgress(false);
  };

  const nextBtn = () => {
    setOnChangeValueProgress(true);

    setCurrentTime(prev => prev + 15);

    player.seekTo(currentTime);
    setOnChangeValueProgress(false);
  };

  //Gọi hàm khi (kéo, chạm ) => thay đổi giá trị của thanh progress
  const onValueChangeOfSlider = value => {
    setOnSlidingComplete(false);
    setOnChangeValueProgress(true);
    setCurrentTime((value * duration) / 100);
    player.seekTo(currentTime);
    if (onSlidingComplete == true) {
      setOnChangeValueProgress(false);
    }
  };

  //Gọi hàm khi thả => Giữ giá trị ngay lúc thả
  const onSlidingCompleteOfSlider = value => {
    setCurrentTime((value * duration) / 100);
    player.seekTo(currentTime);
    setOnChangeValueProgress(false);
    setOnSlidingComplete(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (player && status == 'play' && onChangeValueProgress == false) {
        setCurrentTime(Math.floor(position));
       
      }
      if (position > duration) {
        player.stop();
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  });
  return {
    playTrack,
    pause,
    stop,
    status,
    currentTime,
    getCurrentTime,
    duration,
    position,
    onValueChangeOfSlider,
    onSlidingCompleteOfSlider,
    prevBtn,
    nextBtn,
  };
};

export default AudioHelper;
