import styled from 'styled-components';
import { socket } from '../App';
import ToggleButton from '../components/ToggleButton';
import { Title } from './Board';
import { BasicButton } from '../components/BtnGroup';
import { useEffect, useState } from 'react';
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
    socket.emit('soundTest', 'test');
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

  // const [soundNumber, setSoundNumber] = useState(0);
  // const soundArr = [1, 2, 3];
  // const setSoundNumberSelected = (e: any) => {
  //   localStorage.setItem('soundNumber', e.target.value.toString());
  //   setSoundNumber(e.target.value);
  // };

  useEffect(() => {
    socket.on('soundTest', (payload) => {
      console.log('사운드 테스트');
      let a = document.getElementById('alarmSound') as HTMLAudioElement;
      a.load();
      a.muted = false;
      a.play();
      navigator.vibrate([150, 80, 150]);
    });

    return () => {
      socket.off('soundTest', (payload) => {
        console.log('테스트창 종료');
      });
    };
  }, []);

  return (
    <>
      <Title>설정</Title>
      <ToggleButtonWarp>
        <ToggleButtonLabel>소리</ToggleButtonLabel>
        <ToggleButton
          OnFunc={onSound}
          OffFunc={offSound}
          isOn={localStorage.getItem('onSound')}
        />
        {/* <select
          onChange={setSoundNumberSelected}
          value={soundNumber}
        >
          <>
            {soundArr.map((i, index) => {
              return <option value={i}>{i}번 소리</option>;
            })}
          </>
        </select> */}
      </ToggleButtonWarp>
      <ToggleButtonDesc>새로운 레이드가 등록됐을 때 알람 소리를 재생합니다.</ToggleButtonDesc>
      <ToggleButtonWarp>
        <ToggleButtonLabel>진동</ToggleButtonLabel>
        <ToggleButton
          OnFunc={onVibrate}
          OffFunc={offVibrate}
          isOn={localStorage.getItem('onVibrate')}
        />
      </ToggleButtonWarp>
      <ToggleButtonDesc>
        화면을 켜놓으면 새로운 레이드가 등록됐을 때 핸드폰 진동이 울립니다. (ios 미지원)
      </ToggleButtonDesc>

      <TestBtn OnClick={socketCheck}>알람 테스트</TestBtn>
      <ToggleButtonDesc>알람이 안들릴 때 눌러주면 됩니다.(위에 소리설정을 꺼놔도 재생됩니다.)</ToggleButtonDesc>
    </>
  );
};

export default AlarmConfing;
