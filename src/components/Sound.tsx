import audios from '../img/피카츄.mp3';
import React, { useEffect, useState } from 'react';
import { socket } from '../App';
const Sound = () => {
  //   const isPlay = useAppSelector((state) => state.sound);
  // const [audio] = useState(new Audio(audios));
  let audio = new Audio(audios);
  audio.volume = 0.4;
  audio.autoplay = false;
  audio.onended = (e) => {
    console.log('피카추!');
  };

  socket.on('newPost', function (payload) {
    console.log('여기는 사운드 컴포넌트');
    console.log(payload);
    if (payload === true) {
      // audio.play();
      audio.play();
      // const promise = audio.play();
      // if (promise !== undefined) {
      //   promise.then(() => {}).catch((error) => console.error);
      // }
    }
  });

  // useEffect(() => {
  //   socket.on('newPost', function (payload) {
  //     console.log('여기는 사운드 컴포넌트');
  //     console.log(payload);
  //     if (payload === true) {
  //       // audio.play();
  //       audio.play();
  //       // const promise = audio.play();
  //       // if (promise !== undefined) {
  //       //   promise.then(() => {}).catch((error) => console.error);
  //       // }
  //     }
  //   });
  // }, []);

  return <></>;
};

export default Sound;
