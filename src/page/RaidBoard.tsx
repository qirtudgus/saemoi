import styled, { ThemeProvider, keyframes, css } from 'styled-components';
import { RefObject, useEffect, useRef, useState } from 'react';
import customAxios from '../util/customAxios';
import TitleText from '../components/TitleText';
import 새로고침이미지 from '../img/refresh_white_24dp.svg';
import 작성하기이미지 from '../img/edit_document_white_24dp.svg';
import theme from '../layout/theme';
import { useAppSelector } from '../store/store';
import React from 'react';
import RaidCard from '../components/RaidCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RefreshAni = keyframes`
  to {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(-360deg) ;
  }
`;

interface RefreshInterface {
  isRefresh: boolean;
}

const RefreshBtn = styled.button<RefreshInterface>`
  cursor: pointer;
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.main};
  bottom: 20px;
  right: 20px;
  border-radius: 100%;
  box-shadow: 0px 2px 4px 3px rgb(0 0 0 / 30%);

  & img {
    width: 70%;
  }

  & img.on {
    animation: ${RefreshAni} 0.8s ease;
  }
`;

const WriteBtn = styled.button`
  cursor: pointer;
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.main};
  bottom: 90px;
  right: 20px;
  border-radius: 100%;
  box-shadow: 0px 2px 4px 3px rgb(0 0 0 / 30%);
  & img {
    width: 70%;
  }
`;

const RaidBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [list, setList] = useState<any>(null);
  // const lists = useAppSelector((state) => state.userList);

  const imgRef = useRef() as RefObject<HTMLImageElement>;

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    customAxios('get', '/raidboard/list', {}).then((res) => {
      console.log(res.data);
      setList(res.data);
      setIsLoading(true);
    });
  }, [isLoad]);

  const Refresh = () => {
    let a = imgRef.current;
    a?.classList.remove('on');
    void a?.offsetWidth;
    a?.classList.add('on');
    setIsLoad((prev) => !prev);
    // window.scrollTo({ top: 0 });
    // setIsLoading(false);
    // customAxios('get', '/raidboard/list', {})
    //   .then((res) => {
    //     console.log(res.data);
    //     setList(res.data);
    //   })
    //   .then((res) => {
    //     setIsLoading(true);
    //   });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <p>현재 접속자 : {lists.length}</p>
      {lists.map((i: any) => {
        return <li key={i.id}>{i.id}</li>;
      })} */}
      <TitleText text='레이드 리스트'></TitleText>
      {isLoading
        ? list.map((i: any, index: number) => (
            <RaidCard
              key={i.idx}
              monsterName={i.monsterName}
              raidDifficulty={i.raidDifficulty}
              raidCode={i.raidCode}
              type={i.type}
              date={i.date}
              raidText={i.raidText}
              raidOption={i.raidOption}
            />
          ))
        : '로딩중'}
      <RefreshBtn
        isRefresh={isLoad}
        onClick={Refresh}
      >
        <motion.img
          ref={imgRef}
          // animate={{ rotate: isLoad ? 360 : 0 }}
          // transition={{ duration: 0.5 }}
          src={새로고침이미지}
          alt='새로고침'
        ></motion.img>
      </RefreshBtn>
      <WriteBtn
        onClick={() => {
          navigate('/raidboard/write');
        }}
      >
        <motion.img
          // animate={{ rotate: isLoad ? 360 : 0 }}
          // transition={{ duration: 0.5 }}
          src={작성하기이미지}
          alt='작성하기'
        ></motion.img>
      </WriteBtn>
    </ThemeProvider>
  );
};

export default React.memo(RaidBoard);
