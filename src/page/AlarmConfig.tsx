import styled from 'styled-components';
import { socket } from '../App';
import ToggleButton from '../components/ToggleButton';
import { Title } from './Board';
import { BasicButton } from '../components/BtnGroup';
import audios from '../img/피카츄.mp3';
import { useState, useRef, LegacyRef, RefObject } from 'react';
import { useAppSelector } from '../store/store';

const TestBtn = styled(BasicButton)`
  margin: 5px;
  &:hover {
    background-color: red;
  }
`;

const SoundCheck = styled.button`
  width: 1px;
  height: 1px;
  position: fixed;
  top: -9999px;
  left: -9999px;
`;

const ToggleButtonWarp = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
const ToggleButtonLabel = styled.span`
  font-size: 1.3em;
  margin-right: 20px;
`;

const AlarmConfing = () => {
  //   let audio = new Audio();
  //   audio.src = process.env.PUBLIC_URL + '/피카츄.mp3';
  //   audio.volume = 0.4;
  //   audio.autoplay = false;
  //   audio.onended = (e) => {
  //     console.log('피카추!');
  //   };
  // let a = useAppSelector((state) => state.sound);
  const [audio] = useState(new Audio(audios));
  audio.autoplay = false;
  audio.volume = 0.3;
  audio.onended = (e) => {
    console.log('피카추!');
  };
  function socketCheck() {
    socket.emit('newPost', 'test');
  }

  const onVibrate = () => {
    localStorage.setItem('onVibrate', 'true');
  };
  const onSound = () => {
    localStorage.setItem('onSound', 'true');
  };
  const offVibrate = () => {
    localStorage.removeItem('onVibrate');
  };
  const offSound = () => {
    localStorage.removeItem('onSound');
  };

  const clickCheck = () => {
    console.log('클릭하여 소리 함수 호출');
    document.getElementById('soundId')?.click();
  };
  const audioRef = useRef() as RefObject<HTMLMediaElement>;

  const playCheck = () => {
    console.log('바로 소리 재생');
    // audio.play();
    // console.log(document.getElementById('haha'));
    let a = document.getElementById('haha') as HTMLAudioElement;
    a.play();

    // if (audioRef !== null) {
    //   if (audioRef.current !== null) {
    //     audioRef.current.play();
    //   }
    // }
  };

  return (
    <>
      <Title>설정</Title>

      {/* <SoundCheck
        id='soundId'
        onClick={() => {
          console.log('버튼클릭');
          audio.play();
        }}
      ></SoundCheck> */}
      <ToggleButtonWarp>
        <ToggleButtonLabel>진동</ToggleButtonLabel>
        <ToggleButton
          OnFunc={onVibrate}
          OffFunc={offVibrate}
          isOn={localStorage.getItem('onVibrate')}
        />
      </ToggleButtonWarp>

      <ToggleButtonWarp>
        <ToggleButtonLabel>소리</ToggleButtonLabel>
        <ToggleButton
          OnFunc={onSound}
          OffFunc={offSound}
          isOn={localStorage.getItem('onSound')}
        />
      </ToggleButtonWarp>
      <TestBtn OnClick={socketCheck}>알람 테스트</TestBtn>
      <TestBtn OnClick={clickCheck}>소리 테스트</TestBtn>
      <TestBtn OnClick={playCheck}>소리 테스트</TestBtn>
    </>
  );
};

export default AlarmConfing;
