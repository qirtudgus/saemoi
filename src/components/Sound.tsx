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
      //강제로 상호작용시켜 소리를 낸다.
      document.getElementById('soundId')?.click();
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
