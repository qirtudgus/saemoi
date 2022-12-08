import React, { RefObject, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import customAxios from '../util/customAxios';
import { useAppSelector, useAppDispatch } from '../store/store';
import { socket } from '../App'; //이런식으로 가져와서 소켓 중복안되도록 구현
import { RaidListDispatch } from '../store/raidListSlice';
import { returnDeleteTime, returnTodayString, returnTodayString180s } from '../util/returnTodayString';
import 작성하기이미지 from '../img/edit_document_white_24dp.svg';
import 새로고침이미지 from '../img/refresh_white_24dp.svg';
import 뮤 from '../img/뮤.png';
import RefRaidCard from '../components/RefRaidCard';
import { Title } from './Board';
import styled, { css, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/BtnGroup';
import ToggleButton from '../components/ToggleButton';

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
  $isLoading?: boolean;
  $isRefreshFunc?: boolean;
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

const RefreshBtn = styled(motion.button)<RefreshInterface>`
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.main};
  /* bottom: 20px;
  right: 20px; */
  ${(props) =>
    !props.$isRefreshFunc
      ? css`
          background-color: ${({ theme }) => theme.colors.main};
        `
      : css`
          cursor: default;
          background-color: #9e9e9e;
        `}

  border-radius: 100%;
  box-shadow: 0px 2px 4px 3px rgb(0 0 0 / 20%);

  & img {
    width: 70%;
  }

  & img.on {
    animation: ${RefreshAni} 0.8s ease;
  }
`;

const WriteBtn = styled(motion.button)`
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

const ButtonWrapPc = styled(motion.button)<RefreshInterface>`
  cursor: pointer;
  width: 100px;
  height: 35px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.main};
  ${(props) =>
    !props.$isRefreshFunc
      ? css`
          background-color: ${({ theme }) => theme.colors.main};
        `
      : css`
          cursor: default;
          background-color: #9e9e9e;
        `}
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

const LoadingAni = keyframes`
  from{transform:rotate(0)}
  to{transform:rotate(360deg)}

`;

const LoadingText = styled.div`
  width: 100%;
  height: calc(50vh);
  font-size: 2em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    margin-right: 20px;
    width: 50px;
    animation: ${LoadingAni} 1s ease-out infinite;
  }
`;

const RealTimeRaidBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const imgRef = useRef() as RefObject<HTMLImageElement>;
  // const imgPcRef = useRef() as RefObject<HTMLImageElement>;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.raidList);
  const raidCount = useAppSelector((state) => state.raidCount);

  useEffect(() => {
    setIsLoading(false);
    window.scrollTo({ top: 0 });
    // socket.on('raidList', function (payload) {
    //   dispatch(RaidListDispatch(payload));
    // });
    setIsLoading(true);
    // setInterval(() => {
    //   socket.on('pingOut', (payload) => {
    //     console.log('ping timeout 방지');
    //   });
    // }, 1000);
  }, []);

  // const Refresh = () => {
  //   let a = imgRef.current;
  //   a?.classList.remove('on');
  //   void a?.offsetWidth;
  //   a?.classList.add('on');
  //   setIsLoad((prev) => !prev);
  // };

  // const RefreshPc = () => {
  //   let a = imgPcRef.current;
  //   a?.classList.remove('on');
  //   void a?.offsetWidth;
  //   a?.classList.add('on');
  //   setIsLoad((prev) => !prev);
  // };

  // function socketCheck() {
  //   socket.emit('newPost', 'test');
  // }

  return (
    <>
      <PcBtnWrap>
        <Title>오늘 열린 레이드 {raidCount}회</Title>
        <PcInnerBtnWrap>
          {/* <SoundCheck
            id='soundId'
            onClick={() => {
              audio.play();
            }}
          ></SoundCheck> */}
          {/* <TestBtnWrap>
            <TestBtn OnClick={socketCheck}>newPost 소켓 전송</TestBtn>
          </TestBtnWrap> */}
          {/* <ButtonWrapPc
            whileTap={{ scale: 0.95 }}
            $isLoading={isLoading}
            $isRefreshFunc={isRefreshFunc}
            onClick={isRefreshFunc ? undefined : RefreshPc}
          >
            <img
              ref={imgPcRef}
              src={새로고침이미지}
              alt='새로고침'
            />
            새로고침
          </ButtonWrapPc> */}
          <ButtonWrapPc
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate('/raidboard/write');
            }}
          >
            <img
              src={작성하기이미지}
              alt='등록하기'
            />
            등록하기
          </ButtonWrapPc>
        </PcInnerBtnWrap>
      </PcBtnWrap>
      {/* <button
        onClick={() => {
          console.log(returnTodayString());
          socket.emit('raidList', {
            monsterName: '하하하',
            raidDifficulty: '움하하',
            raidCode: Math.random().toString(),
            type: '하하하',
            date: returnTodayString(),
            deleteDate: returnTodayString180s(),
            raidText: '하하하하',
            raidOption: ['ㅋㅋㅋ', 'ㅎㅎㅎ'],
          });
        }}
      >
        레이드 전송
      </button> */}
      {isLoading ? (
        list?.map((i: any, index: number) => (
          <RefRaidCard
            // ref={ref}
            key={i.raidCode}
            monsterName={i.monsterName}
            raidDifficulty={i.raidDifficulty}
            raidCode={i.raidCode}
            type={i.type}
            date={i.date}
            deleteDate={i.deleteDate}
            raidText={i.etcText}
            raidOption={i.optionList}
          ></RefRaidCard>
        ))
      ) : (
        <LoadingText>
          <img
            src={뮤}
            alt='로딩중'
          />
          불러오는 중...
        </LoadingText>
      )}
      <BtnWrap>
        {/* <RefreshBtn
          whileTap={{ scale: 0.95 }}
          $isLoading={isLoading}
          $isRefreshFunc={isRefreshFunc}
          onClick={isRefreshFunc ? undefined : Refresh}
        >
          <img
            ref={imgRef}
            // animate={{ rotate: isLoad ? 360 : 0 }}
            // transition={{ duration: 0.5 }}
            src={새로고침이미지}
            alt='새로고침'
          ></img>
        </RefreshBtn> */}
        <WriteBtn
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate('/raidboard/write');
          }}
        >
          <img
            // animate={{ rotate: isLoad ? 360 : 0 }}
            // transition={{ duration: 0.5 }}
            src={작성하기이미지}
            alt='등록하기'
          ></img>
        </WriteBtn>
      </BtnWrap>
    </>
  );
};

export default React.memo(RealTimeRaidBoard);
