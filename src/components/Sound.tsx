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

  let a = process.env.PUBLIC_URL;

  let audio2 = new Audio();
  audio2.src = `${a}/피카츄.mp3`;
  audio2.volume = 0.1;
  audio2.autoplay = false;
  socket.on('newPost', function (payload) {
    console.log('여기는 사운드 컴포넌트');
    console.log(payload);
    if (payload === true) {
      // audio.play();
      // audio.play();
      const promise = audio.play();
      const promise2 = audio2.play();
      // audio2.play();
      if (promise2 !== undefined) {
        promise2
          .then(() => {
            console.log('재생완료');
          })
          .catch((error) => {
            audio.play();
            audio2.play();
            console.log(error);
          });
      }
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
