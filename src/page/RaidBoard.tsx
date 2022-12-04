import styled, { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import customAxios from '../util/customAxios';
import TitleText from '../components/TitleText';
import 새로고침이미지 from '../img/refresh_white_24dp.svg';
import theme from '../layout/theme';
import { useAppSelector } from '../store/store';
import React from 'react';
import RaidCard from '../components/RaidCard';

const RefreshBtn = styled.button`
  cursor: pointer;
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.main};
  bottom: 20px;
  right: 20px;
  border-radius: 100%;
  & img {
    width: 70%;
  }
`;

const RaidBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [list, setList] = useState<any>(null);
  const lists = useAppSelector((state) => state.userList);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    customAxios('get', '/raidboard/list', {}).then((res) => {
      console.log(res.data);
      setList(res.data);
      setIsLoading(true);
    });
  }, [isLoad]);

  const Refresh = () => {
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
      <p>현재 접속자 : {lists.length}</p>
      {lists.map((i: any) => {
        return <li key={i.id}>{i.id}</li>;
      })}
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
      <RefreshBtn onClick={Refresh}>
        <img
          src={새로고침이미지}
          alt='새로고침'
        />
      </RefreshBtn>
    </ThemeProvider>
  );
};

export default React.memo(RaidBoard);
