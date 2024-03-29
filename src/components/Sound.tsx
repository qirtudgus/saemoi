// import audios from '../img/chu.mp3';

import { useEffect } from 'react';
import { socket } from '../App';
import audios from '../img/bbong.mp3';

const Sound = () => {
  const soundArr = [audios];

  const notifi = (vibrate: string | null, sound: string | null) => {
    if (sound === 'true') {
      let audioElement = document.getElementById('alarmSound') as HTMLAudioElement;
      audioElement.load();
      audioElement.muted = false;
      audioElement.play();
    }
    if (vibrate === 'true') {
      //진동은 지원되지 않는 기기가 많아서 꼭 소리재생 후에 실행
      navigator.vibrate([150, 80, 150]);
    }
    if (Notification.permission === 'granted') {
      const notification = new Notification('새로운 레이드가 등록되었습니다!', {
        tag: '새로움',
        renotify: true,
        silent: true,
      });
      //알람을 클릭 시 사이트를 포커싱해준다.
      notification.onclick = (event) => {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        // window.open('http://www.mozilla.org', '_blank');

        window.focus();
      };
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
