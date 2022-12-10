import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../store/store';
import { motion } from 'framer-motion';
import 로고 from '../img/logo_s.svg';

const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  background: ##35363a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Button = styled(motion.button)`
  cursor: pointer;
  width: 130px;
  height: 55px;
  background: #ef5a34;
  font-size: 1.2em;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 9px 5px rgba(0, 0, 0, 0.2);
`;

const usersCountAni = keyframes`
 0%{transform:translateY(3px)}
 50%{transform:translateY(-3px)}
 100%{transform:translateY(3px)}
`;
const UsersCount = styled.span`
  display: inline-block;
  animation: ${usersCountAni} 1s ease infinite;
  color: #ef5a34;
  font-weight: bold;
`;

const UsersCountText = styled.p`
  font-size: 2.4em;
  margin: 20px;
`;

const SelfText = styled.p``;

const Img = styled.img`
  width: 150px;
`;

const Home = () => {
  const navigate = useNavigate();
  const usersCount = useAppSelector((state) => state.userCount);
  let a = null;
  // replace console.* for disable log on production
  if (process.env.NODE_ENV === 'development') {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
    a = process.env.REACT_APP_DEV_TITLE;
  }

  return (
    <>
      <Bg>
        <Img src={로고}></Img>
        <SelfText>실시간 테라레이드 파티원 모집!{a}</SelfText>
        <UsersCountText>
          현재 접속자 <UsersCount>{usersCount}</UsersCount> 명
        </UsersCountText>
        <Button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            let a = document.getElementById('alarmSound') as HTMLAudioElement;

            a.load();
            a.muted = true;
            a.play();

            navigate('/realtimeraidboard');
          }}
        >
          입장하기
        </Button>
      </Bg>
    </>
  );
};

export default Home;
