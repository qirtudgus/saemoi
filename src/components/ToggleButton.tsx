import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

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

export default function ToggleButton(props: any) {
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
