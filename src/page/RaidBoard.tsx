import { motion } from 'framer-motion';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes, ThemeProvider } from 'styled-components';
import RefRaidCard from '../components/RefRaidCard';
import 작성하기이미지 from '../img/edit_document_white_24dp.svg';
import 새로고침이미지 from '../img/refresh_white_24dp.svg';
import 뮤 from '../img/뮤.png';
import theme from '../layout/theme';
import customAxios from '../util/customAxios';
import { Title } from './Board';

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
  isLoading?: boolean;
  isRefreshFunc?: boolean;
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
    !props.isRefreshFunc
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
    !props.isRefreshFunc
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

const RaidBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isRefreshFunc, setIsRefreshFunc] = useState(true);
  const [list, setList] = useState<any>(null);
  const [viewList, setViewList] = useState<any>(null);
  // const lists = useAppSelector((state) => state.userList);

  const imgRef = useRef() as RefObject<HTMLImageElement>;
  const imgPcRef = useRef() as RefObject<HTMLImageElement>;

  const [ref, InView] = useInView({
    threshold: 0.8, //타겟이 화면에 얼만큼 보였을 때 InView를 토글할 것인지
    // delay: 2000, //로딩되는 딜레이
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
    setIsRefreshFunc(true);
    window.scrollTo({ top: 0 });
    // customAxios('get', '/raidboard/list', {}).then((res) => {
    //   console.log(res.data);
    //   setList(res.data);
    //   setIsLoading(true);
    // });
    setTimeout(() => {
      customAxios('get', '/raidboard/list', {}).then((res) => {
        // console.log(res.data);
        setList(res.data);
        setViewList(res.data.slice(0, 10));
        setIsLoading(true);
        setIsRefreshFunc(false);
      });
    }, 500);
  }, [isLoad]);

  useEffect(() => {
    if (InView === true) {
      console.log('지금 InView가 true');
      console.log(viewList.length);
      console.log(list.length);
      if (viewList.length === list.length) {
        console.log('전부 불러왔다.');
        return;
      } else {
        //10개씩 추가
        setViewList([...viewList, ...list.slice(viewList.length, viewList.length + 10)]);
        console.log(list);
      }
    }
  }, [InView]);

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
      <PcBtnWrap>
        <Title>레이드 리스트</Title>
        <PcInnerBtnWrap>
          <ButtonWrapPc
            whileTap={{ scale: 0.95 }}
            isLoading={isLoading}
            isRefreshFunc={isRefreshFunc}
            onClick={isRefreshFunc ? undefined : RefreshPc}
          >
            <img
              ref={imgPcRef}
              src={새로고침이미지}
              alt='새로고침'
            />
            새로고침
          </ButtonWrapPc>
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
        viewList.map((i: any, index: number) => (
          <RefRaidCard
            ref={ref}
            key={i.idx}
            monsterName={i.monsterName}
            raidDifficulty={i.raidDifficulty}
            raidCode={i.raidCode}
            type={i.type}
            date={i.date}
            raidText={i.raidText}
            raidOption={i.raidOption}
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
        <RefreshBtn
          whileTap={{ scale: 0.95 }}
          isLoading={isLoading}
          isRefreshFunc={isRefreshFunc}
          onClick={isRefreshFunc ? undefined : Refresh}
        >
          <img
            ref={imgRef}
            // animate={{ rotate: isLoad ? 360 : 0 }}
            // transition={{ duration: 0.5 }}
            src={새로고침이미지}
            alt='새로고침'
          ></img>
        </RefreshBtn>
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
    </ThemeProvider>
  );
};

export default React.memo(RaidBoard);
