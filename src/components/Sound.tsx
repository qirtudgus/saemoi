import audios from '../img/피카츄.mp3';
import React, { useEffect, useState } from 'react';
import { socket } from '../App';
const Sound = () => {
  //   const isPlay = useAppSelector((state) => state.sound);
  const [audio] = useState(new Audio(audios));
  audio.play();
  audio.pause();

  audio.volume = 0.4;
  audio.autoplay = false;
  audio.onended = (e) => {
    console.log('피카추!');
  };

  useEffect(() => {
    socket.on('newPost', function (payload) {
      console.log('여기는 사운드 컴포넌트');
      console.log(payload);
      if (payload === true) {
        audio.play();
      }
    });
  }, []);

  return <></>;
};

export default Sound;
