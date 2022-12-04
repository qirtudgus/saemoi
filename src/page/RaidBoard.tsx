import styled, { ThemeProvider, keyframes, css } from 'styled-components';
import { RefObject, useEffect, useRef, useState } from 'react';
import customAxios from '../util/customAxios';
import TitleText from '../components/TitleText';
import 새로고침이미지 from '../img/refresh_white_24dp.svg';
import 작성하기이미지 from '../img/edit_document_white_24dp.svg';
import 등록하기 from '../img/post_add_white_24dp.svg';
import theme from '../layout/theme';
import { useAppSelector } from '../store/store';
import React from 'react';
import RaidCard from '../components/RaidCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SolidButton } from '../components/BtnGroup';

const RefreshAni = keyframes`
  to {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(-360deg) ;
  }
`;

interface RefreshInterface {
  isRefresh?: boolean;
}

const BtnWrap = styled.div`
  margin: 0 auto;
  position: fixed;
  display: none;
  bottom: 23vh;
  width: 95%;
  max-width: 1280px;
  flex-direction: column-reverse;
  height: 115px;
  justify-content: space-between;
  align-items: flex-end;
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    bottom: 20px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

const RefreshBtn = styled.button<RefreshInterface>`
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.main};
  /* bottom: 20px;
  right: 20px; */
  border-radius: 100%;
  box-shadow: 0px 2px 4px 3px rgb(0 0 0 / 20%);

  & img {
    width: 70%;
  }

  & img.on {
    animation: ${RefreshAni} 0.8s ease;
  }
`;

const WriteBtn = styled.button`
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.main};
  /* bottom: 90px;
  right: 20px; */
  border-radius: 100%;
  box-shadow: 0px 2px 4px 3px rgb(0 0 0 / 20%);
  & img {
    width: 70%;
  }
`;

const PcBtnWrap = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
`;

const PcInnerBtnWrap = styled.div`
  display: flex;
`;
const Title = styled.h1`
  font-size: 2em;
  padding: 15px 0;
  display: block;
  font-weight: bold;
  word-break: keep-all;
  justify-content: flex-start;
  flex-shrink: 0;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8em;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.6em;
  }
`;

const ButtonWrapPc = styled.button<RefreshInterface>`
  cursor: pointer;
  width: 100px;
  height: 35px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.main};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  &:hover {
    opacity: 0.8;
  }
  & img {
    max-width: 25px;
  }
  & img.on {
    animation: ${RefreshAni} 0.8s ease;
  }

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }

  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const RaidBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [list, setList] = useState<any>(null);
  // const lists = useAppSelector((state) => state.userList);

  const imgRef = useRef() as RefObject<HTMLImageElement>;
  const imgPcRef = useRef() as RefObject<HTMLImageElement>;

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
  };

  const RefreshPc = () => {
    let a = imgPcRef.current;
    a?.classList.remove('on');
    void a?.offsetWidth;
    a?.classList.add('on');
    setIsLoad((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <p>현재 접속자 : {lists.length}</p>
      {lists.map((i: any) => {
        return <li key={i.id}>{i.id}</li>;
      })} */}
      <PcBtnWrap>
        <Title>레이드 리스트</Title>
        <PcInnerBtnWrap>
          <ButtonWrapPc onClick={RefreshPc}>
            <img
              ref={imgPcRef}
              src={새로고침이미지}
              alt='새로고침'
            />
            새로고침
          </ButtonWrapPc>
          <ButtonWrapPc
            onClick={() => {
              console.log('test');
            }}
          >
            <img
              src={작성하기이미지}
              alt='작성하기'
            />
            등록하기
          </ButtonWrapPc>
        </PcInnerBtnWrap>
      </PcBtnWrap>
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
      <BtnWrap>
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
      </BtnWrap>
    </ThemeProvider>
  );
};

export default React.memo(RaidBoard);
