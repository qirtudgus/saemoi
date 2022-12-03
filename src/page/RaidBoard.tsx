import styled, { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import customAxios from '../util/customAxios';
import { elapsedTime } from '../util/returnTodayString';
import TitleText from '../components/TitleText';
import 새로고침이미지 from '../img/refresh_white_24dp.svg';
import theme from '../layout/theme';

const ListCard = styled.div`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 14%);
  padding: 15px 10px;
  font-size: 1em;
  & p {
    word-break: keep-all;
    line-height: 1.3em;
  }
`;

const ListFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListTop = styled.p`
  font-size: 1.2em;
  margin-bottom: 5px;
`;

const ListFooterTime = styled.span`
  margin-right: 0px !important;
`;

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

const VerticalLine = styled.div`
  display: inline-block;
  border-left: 1px solid #dadde6;
  margin: 0 10px;
  height: 15px;
`;

const RaidBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<any>(null);

  useEffect(() => {
    customAxios('get', '/raidboard/list', {}).then((res) => {
      console.log(res.data);
      setList(res.data);
      setIsLoading(true);
    });
  }, []);

  const Refresh = () => {
    window.scrollTo({ top: 0 });
    setIsLoading(false);
    customAxios('get', '/raidboard/list', {}).then((res) => {
      console.log(res.data);
      setList(res.data);

      setTimeout(() => setIsLoading(true), 500);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <TitleText text='레이드 리스트'></TitleText>
        {isLoading
          ? list.map((i: any, index: number) => (
              <ListCard>
                <ListTop>
                  <span>{i.raidDifficulty}</span>
                  <VerticalLine />
                  <span>{i.monsterName}</span>
                  <VerticalLine />
                  <span>{i.type}</span>
                  <VerticalLine />
                  <span>{i.raidCode}</span>
                </ListTop>
                <p>{i.raidOption}</p>
                {/* <p>{i.raidPosition}</p> */}
                <p>{i.raidText}</p>
                <ListFooter>
                  <span>{i.nickname}</span>
                  <ListFooterTime> {elapsedTime(i.date)}</ListFooterTime>
                </ListFooter>
              </ListCard>
            ))
          : '로딩중'}
        <RefreshBtn onClick={Refresh}>
          <img
            src={새로고침이미지}
            alt='새로고침'
          />
        </RefreshBtn>
      </>
    </ThemeProvider>
  );
};

export default RaidBoard;
