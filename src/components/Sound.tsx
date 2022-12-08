// import audios from '../img/chu.mp3';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { socket } from '../App';
import audios from '../img/피카츄.mp3';

const SoundCheck = styled.button`
  width: 1px;
  height: 1px;
  position: fixed;
  top: -9999px;
  left: -9999px;
`;

const Sound = () => {
  //   const isPlay = useAppSelector((state) => state.sound);
  const [audio] = useState(new Audio(audios));
  // let audio = new Audio();
  // audio.src = process.env.PUBLIC_URL + '/피카츄.mp3';
  // audio.volume = 0.4;
  // audio.autoplay = false;
  // audio.onended = (e) => {
  //   console.log('피카추!');
  // };

  const notifi = (vibrate: string | null, sound: string | null) => {
    if (vibrate === 'true') {
      console.log('진동 재생');
      navigator.vibrate([200, 100, 200]);
    }
    if (sound === 'true') {
      console.log('사운드 재생');
      //pc 크롬과 모바일 크롬에서는 되는데, 애플에선 안된다.
      // audio.play();

      //이건 애플도 되나 테스트
      document.getElementById('soundId')?.click();
    }
  };

  socket.on('newPost', function (payload) {
    if (payload === true) {
      let vibrateConfig = localStorage.getItem('onVibrate');
      let soundConfig = localStorage.getItem('onSound');
      notifi(vibrateConfig, soundConfig);
      //강제로 상호작용시켜 소리를 낸다.

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

  return (
    <>
      {' '}
      <SoundCheck
        id='soundId'
        onClick={() => {
          console.log('버튼클릭');
          audio.play();
        }}
      ></SoundCheck>
    </>
  );
};

export default Sound;
