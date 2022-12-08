import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '../store/store';
import { motion } from 'framer-motion';
import 로고 from '../img/logo_s.svg';
import { useEffect, useLayoutEffect } from 'react';

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

  // useEffect(() => {
  //   let a = document.getElementById('haha') as HTMLAudioElement;
  //   a.load();
  //   a.volume = 1;
  //   a.play();
  // }, []);

  // document.addEventListener('click', () => {
  //   let a = document.getElementById('haha') as HTMLAudioElement;
  //   a.load();
  //   a.volume = 1;
  //   a.play();
  // });
  // useEffect(() => {
  //   const play = () => {
  //     let a = document.getElementById('haha') as HTMLAudioElement;
  //     a.load();
  //     a.volume = 1;
  //     a.play();
  //   };
  //   document.addEventListener('click', play);
  //   document.addEventListener('touchstart', play);

  //   return () => {
  //     document.removeEventListener('click', play);
  //     document.removeEventListener('touchstart', play);
  //   };
  // }, []);

  return (
    <>
      <Bg>
        <Img src={로고}></Img>
        <SelfText>실시간 테라레이드 파티원 모집!</SelfText>
        <UsersCountText>
          현재 접속자 <UsersCount>{usersCount}</UsersCount> 명
        </UsersCountText>
        <Button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            // audio.play();
            // let a = document.getElementById('haha') as HTMLAudioElement;
            // a.load();
            // a.volume = 0;
            // a.play();
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
