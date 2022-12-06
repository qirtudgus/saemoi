import React, { useEffect, useRef, useState } from 'react';
import customAxios from '../util/customAxios';
import { useAppSelector, useAppDispatch } from '../store/store';
import { socket } from '../App'; //이런식으로 가져와서 소켓 중복안되도록 구현
import { RaidListDispatch } from '../store/raidListSlice';
import { returnDeleteTime, returnTodayString, returnTodayString180s } from '../util/returnTodayString';

import RefRaidCard from '../components/RefRaidCard';
import { Title } from './Board';
interface RaidListInterface {
  monsterName: string;
  raidDifficulty: string;
  raidCode: string;
  type: string;
  date: string;
  raidText: string;
  raidOption: string;
}

const SocketTest = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.raidList);

  useEffect(() => {
    socket.on('raidList', function (payload) {
      dispatch(RaidListDispatch(payload));
    });
  }, []);

  return (
    <>
      <Title>오늘 열린 레이드 {list.length}회</Title>
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
      {list.map((i: any, index: number) => (
        <RefRaidCard
          // ref={ref}
          key={i.idx}
          monsterName={i.monsterName}
          raidDifficulty={i.raidDifficulty}
          raidCode={i.raidCode}
          type={i.type}
          date={i.date}
          deleteDate={i.deleteDate}
          raidText={i.etcText}
          raidOption={i.optionList}
        ></RefRaidCard>
      ))}
    </>
  );
};

export default React.memo(SocketTest);
