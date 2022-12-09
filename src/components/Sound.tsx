// import audios from '../img/chu.mp3';

import { useEffect } from 'react';
import { socket } from '../App';
import audios from '../img/bbong.mp3';

const Sound = () => {
  const soundArr = [audios];

  const notifi = (vibrate: string | null, sound: string | null) => {
    if (sound === 'true') {
      console.log('사운드 재생');
      let a = document.getElementById('alarmSound') as HTMLAudioElement;
      a.load();
      a.muted = false;
      a.play();
    }
    if (vibrate === 'true') {
      //진동은 지원되지 않는 기기가 많아서 꼭 소리재생 후에 실행
      console.log('진동 재생');
      navigator.vibrate([150, 80, 150]);
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
        preload='auto'
        src={soundArr[0]}
        id='alarmSound'
      ></audio>
    </>
  );
};

export default Sound;
