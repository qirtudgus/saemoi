// import audios from '../img/chu.mp3';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { socket } from '../App';
import audios from '../img/피카츄.mp3';

const Sound = () => {
  const notifi = (vibrate: string | null, sound: string | null) => {
    if (sound === 'true') {
      console.log('사운드 재생');
      let a = document.getElementById('haha') as HTMLAudioElement;
      a.play();
    }
    if (vibrate === 'true') {
      //진동은 지원되지 않는 기기가 많아서 꼭 소리재생 후에 실행
      console.log('진동 재생');
      navigator.vibrate([200, 100, 200]);
    }
  };

  useEffect(() => {
    socket.on('newPost', function (payload) {
      if (payload === true) {
        let vibrateConfig = localStorage.getItem('onVibrate');
        let soundConfig = localStorage.getItem('onSound');
        notifi(vibrateConfig, soundConfig);
      }
    });
  }, []);

  return (
    <>
      <audio
        onEnded={() => {
          console.log('피카추!~');
        }}
        preload='auto'
        // autoPlay={true}
        src={audios}
        id='haha'
      ></audio>
      {/* <SoundCheck
        id='soundId'
        onClick={() => {
          console.log('버튼클릭');
          audio.play();
        }}
      ></SoundCheck> */}
    </>
  );
};

export default Sound;
