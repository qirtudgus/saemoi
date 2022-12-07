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

  const notifi = (vibrate: string | null, sound: string | null) => {
    if (vibrate === 'true') {
      console.log('진동 재생');
      navigator.vibrate([200, 100, 200]);
    }
    if (sound === 'true') {
      console.log('사운드 재생');
      document.getElementById('soundId')?.click();
    }
  };

  socket.on('newPost', function (payload) {
    if (payload === true) {
      let vibrateConfig = localStorage.getItem('onVibrate');
      let soundConfig = localStorage.getItem('onSound');
      console.log(vibrateConfig);
      console.log(typeof vibrateConfig);
      console.log(soundConfig);
      console.log(typeof soundConfig);
      notifi(vibrateConfig, soundConfig);
      //강제로 상호작용시켜 소리를 낸다.

      // test.current?.click();
      // audio.play();
      // audio.play();
      // const promise = audio.play();
      // const promise2 = audio2.play();
      // audio2.play();

      //대체코드
      // if (promise2 !== undefined) {
      //   promise2
      //     .then(() => {
      //       console.log('재생완료');
      //     })
      //     .catch((error) => {
      //       audio.play();
      //       audio2.play();
      //       console.log(error);
      //     });
      // }
    }
  });

  return <></>;
};

export default Sound;
