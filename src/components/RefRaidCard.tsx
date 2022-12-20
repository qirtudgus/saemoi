import { motion } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/ko';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { socket } from '../App';
import { useAppSelector } from '../store/store';
import close from '../img/close_black_24dp.svg';
const ListCard = styled(motion.div)`
  width: 100%;
  height: auto;
  position: relative;
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

export const ExitListCard = styled(ListCard)``;

export const ExitDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  font-weight: bold;
  color: #fff;
`;

const ListTop = styled.p`
  align-items: center;
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 5px; */
  font-size: 1.3em;
  & span:first-child {
    margin-right: 5px;
    flex-shrink: 0;
  }
  & span {
  }
  & .raidCode {
    color: #77ff77;
    letter-spacing: 0.5px;
  }
`;

const ListFooterTime = styled.span`
  display: block;
  width: auto;
  text-align: right;
  margin-right: 0px !important;
  font-size: 0.85em;
  display: flex;
  align-items: center;
  & span {
    cursor: pointer;
    margin-left: 5px;
    margin-right: 0px !important;
    display: flex;
    align-items: center;
  }
  & img {
    filter: invert(49%) sepia(20%) saturate(7074%) hue-rotate(340deg) brightness(96%) contrast(95%);
    width: 20px;
    height: 20px;
  }
  & span:hover {
    & img {
      filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(22deg) brightness(110%) contrast(99%);
    }
  }
`;

const VerticalLine = styled.span`
  display: inline-block;
  border-left: 1px solid #dadde6;
  margin: 0 10px;
  height: 10px;
`;

const RaidText = styled.span`
  font-size: 0.9em;
`;

interface RefRaidCardPropsInterface {
  monsterName: string;
  raidDifficulty: string;
  raidCode: string;
  type: string;
  date: string;
  deleteDate: string;
  raidText: string;
  raidOption: string;
  socketId: string;
}

const RefRaidCard = forwardRef(function (props: RefRaidCardPropsInterface, ref: React.Ref<HTMLDivElement> | undefined) {
  const socketId = useAppSelector((state) => state.MySocketId);

  return (
    <>
      {moment().diff(props.date, 'seconds') > 180 ? (
        <ExitListCard
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1, x: [5, -5, 0] }}
          transition={{ duration: 0.4 }}
          ref={ref}
        >
          <ExitDiv>종료된 레이드</ExitDiv>
          <ListTop as='div'>
            <div>
              <span>{props.raidDifficulty}</span>
              <span>{props.monsterName}</span>
              <VerticalLine />
              <span className='raidCode'>{props.raidCode}</span>
            </div>
            <ListFooterTime> {props.date.slice(-9)}</ListFooterTime>
          </ListTop>
          {props.raidText !== '' && (
            <p>
              <RaidText>- </RaidText>
              {props.raidText}
            </p>
          )}
          {props.raidOption !== '' && (
            <p>
              <RaidText># </RaidText>
              {props.raidOption}
            </p>
          )}
        </ExitListCard>
      ) : (
        <ListCard
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1, y: [0, 20, 0] }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          ref={ref}
        >
          <ListTop as='div'>
            <div>
              <span>{props.raidDifficulty}</span>
              <span>{props.monsterName}</span>
              <VerticalLine />
              <span className='raidCode'>{props.raidCode}</span>
            </div>
            <ListFooterTime>
              {props.date.slice(-9)}
              {socketId === props.socketId && (
                <span
                  onClick={() => {
                    if (window.confirm('레이드를 삭제하겠습니까?')) {
                      socket.emit('DeleteRaidList', props.raidCode);
                    }
                  }}
                >
                  <img
                    src={close}
                    alt='레이드 삭제'
                  ></img>
                </span>
              )}
            </ListFooterTime>
          </ListTop>
          {props.raidText !== '' && (
            <p>
              <RaidText>- </RaidText>
              {props.raidText}
            </p>
          )}
          {props.raidOption !== '' && (
            <p>
              <RaidText># </RaidText>
              {props.raidOption}
            </p>
          )}
        </ListCard>
      )}
    </>
  );
});
//리덕스에서 배열을 통째로 바꾸기때문에 react memo가 필요없음
export default RefRaidCard;
