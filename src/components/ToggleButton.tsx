import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Switch = styled(motion.div)`
  width: 65px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: flex-start;
  border-radius: 50px;
  padding: 7px;
  cursor: pointer;
  align-items: center;
  flex-shrink: 0;
  &[data-ison='true'] {
    justify-content: flex-end;
    background-color: #ef5a34;
  }

  & .handle {
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 40px;
  }
`;

interface ToggleButtonInterface {
  OnFunc: () => void;
  OffFunc: () => void;
  isOn: string | null;
}

export default function ToggleButton(props: ToggleButtonInterface) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitchOn = () => {
    props.OnFunc();
    setIsOn(!isOn);
  };
  const toggleSwitchOff = () => {
    props.OffFunc();
    setIsOn(!isOn);
  };
  useEffect(() => {
    if (props.isOn === 'true') {
      setIsOn(true);
    }
  }, []);

  return (
    <>
      <Switch
        className='switch'
        data-ison={isOn}
        onClick={isOn ? toggleSwitchOff : toggleSwitchOn}
      >
        <motion.div className='handle' />
      </Switch>
    </>
  );
}

export function PcNotificationToggleButton(props: { isOn: string | boolean }) {
  const [isOn, setIsOn] = useState(props.isOn);

  // const toggleSwitchOn = () => {
  //   props.OnFunc();
  //   setIsOn(!isOn);
  // };
  // const toggleSwitchOff = () => {
  //   props.OffFunc();
  //   setIsOn(!isOn);
  // };

  const isNotification = () => {
    if (!('Notification' in window)) {
      alert('이 브라우저는 알림을 지원하지 않습니다.');
    } else {
      if (Notification.permission === 'granted') {
        setIsOn(true);
        alert('사이트 알람이 허용되어있습니다. 알림을 차단하시려면 브라우저를 확인해주세요!');
      }
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permisson) => {
          if (permisson === 'granted') {
            setIsOn(true);
            alert('알람이 허용되었습니다.');
          } else {
            setIsOn(false);
            alert('알람이 거부되었습니다.');
          }
        });
      }
      if (Notification.permission === 'denied') {
        alert('사이트 알람이 차단되어있습니다. 알림을 받으려면 브라우저를 확인해주세요!');
        setIsOn(false);
      }
    }
  };

  return (
    <>
      <Switch
        className='switch'
        data-ison={isOn}
        onClick={isNotification}
      >
        <motion.div className='handle' />
      </Switch>
    </>
  );
}
