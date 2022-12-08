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

const ToggleButtonWarp = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  flex-wrap: wrap;
`;
const ToggleButtonLabel = styled.span`
  font-size: 1.3em;
  margin-right: 20px;
  flex-shrink: 0;
  font-weight: bold;
`;
const ToggleButtonDesc = styled.p`
  margin-bottom: 30px;
  word-break: keep-all;
  font-size: 1.2em;
`;

const AlarmConfing = () => {
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

      <ToggleButtonWarp>
        <ToggleButtonLabel>진동</ToggleButtonLabel>
        <ToggleButton
          OnFunc={onVibrate}
          OffFunc={offVibrate}
          isOn={localStorage.getItem('onVibrate')}
        />
      </ToggleButtonWarp>
      <ToggleButtonDesc>
        화면을 켜놓으면 새로운 레이드가 등록됐을 때 핸드폰 진동이 울리게 합니다. (ios 미지원)
      </ToggleButtonDesc>
      <ToggleButtonWarp>
        <ToggleButtonLabel>소리</ToggleButtonLabel>
        <ToggleButton
          OnFunc={onSound}
          OffFunc={offSound}
          isOn={localStorage.getItem('onSound')}
        />
      </ToggleButtonWarp>
      <ToggleButtonDesc>
        새로운 레이드가 등록됐을 때 알람 소리를 재생합니다. (백그라운드에 웹브라우저가 켜져 있다면 다른 앱을 사용할 때도
        재생됩니다.)
      </ToggleButtonDesc>
      <TestBtn OnClick={socketCheck}>알람 테스트</TestBtn>
    </>
  );
};

export default AlarmConfing;
