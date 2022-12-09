import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import RefRaidCard from '../components/RefRaidCard';
import 작성하기이미지 from '../img/edit_document_white_24dp.svg';
import 뮤 from '../img/뮤.png';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Title } from './Board';

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

const WriteBtn = styled(motion.button)`
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 100%;
  box-shadow: 0px 2px 4px 3px rgb(0 0 0 / 20%);
  & img {
    width: 35px;
    height: 35px;
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.raidList);
  const raidCount = useAppSelector((state) => state.raidCount);

  useEffect(() => {
    setIsLoading(false);
    window.scrollTo({ top: 0 });
    setIsLoading(true);
  }, []);

  return (
    <>
      <PcBtnWrap>
        <Title>오늘 열린 레이드 {raidCount}회</Title>
        <PcInnerBtnWrap>
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
      {isLoading ? (
        list?.map((i: any, index: number) => (
          <RefRaidCard
            key={index}
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
        <WriteBtn
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate('/raidboard/write');
          }}
        >
          <img
            src={작성하기이미지}
            alt='등록하기'
          ></img>
        </WriteBtn>
      </BtnWrap>
    </>
  );
};

export default React.memo(RealTimeRaidBoard);
