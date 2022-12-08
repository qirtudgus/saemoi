import styled from 'styled-components';
import { socket } from '../App';
import ToggleButton from '../components/ToggleButton';
import { Title } from './Board';
import { BasicButton } from '../components/BtnGroup';

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
  let audio = new Audio();
  audio.src = process.env.PUBLIC_URL + '/chu.mp3';
  audio.volume = 0.4;
  audio.autoplay = false;
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

  return (
    <>
      <Title>설정</Title>

      <SoundCheck
        id='soundId'
        onClick={() => {
          console.log('버튼클릭');
          audio.play();
        }}
      ></SoundCheck>
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
    </>
  );
};

export default AlarmConfing;
