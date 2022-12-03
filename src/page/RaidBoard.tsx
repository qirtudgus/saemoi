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
  background-color: #575757;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 44%);
  padding: 10px 10px;
  & p {
    word-break: keep-all;
    line-height: 1.4em;
  }
`;

const ListTop = styled.p`
  align-items: center;
  display: flex;
  margin-bottom: 5px;
  font-size: 1.1em;
`;

const ListFooterTime = styled.span`
  display: block;
  width: 100%;
  text-align: right;
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

const VerticalLine = styled.span`
  display: inline-block;
  border-left: 1px solid #dadde6;
  margin: 0 10px;
  height: 10px;
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
    customAxios('get', '/raidboard/list', {})
      .then((res) => {
        console.log(res.data);
        setList(res.data);

        // setTimeout(() => setIsLoading(true), 330);
      })
      .then((res) => {
        setIsLoading(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <TitleText text='레이드 리스트'></TitleText>
        {isLoading
          ? list.map((i: any, index: number) => (
              <ListCard key={index}>
                <ListTop>
                  <span>{i.raidDifficulty}</span>
                  <VerticalLine />
                  <span>{i.monsterName}</span>
                  <VerticalLine />
                  <span>{i.type}</span>
                  <VerticalLine />
                  <span>{i.raidCode}</span>

                  <ListFooterTime> {elapsedTime(i.date)}</ListFooterTime>
                </ListTop>
                <p>{i.raidText}</p>
                <p>{i.raidOption}</p>
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
