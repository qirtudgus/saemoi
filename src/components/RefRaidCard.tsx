import { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
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

const ExitListCard = styled(ListCard)``;

const ExitDiv = styled.div`
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
  margin-bottom: 5px;
  font-size: 1.1em;
  /* flex-shrink: 0; */
  & span:first-child {
    margin-right: 5px;
    flex-shrink: 0;
  }
  & span {
    /* width: auto; */
  }
  & .raidCode {
    color: #77ff77;
    letter-spacing: 0.5px;
    /* color: ${({ theme }) => theme.colors.main}; */
  }
`;

const ListFooterTime = styled.span`
  display: block;
  width: auto;
  text-align: right;
  margin-right: 0px !important;
  font-size: 0.85em;
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

const RefRaidCard = forwardRef(function (props: any, ref: any) {
  return (
    <>
      {moment().diff(props.date, 'seconds') > 10 ? (
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
        </ListCard>
      )}
    </>
  );
});
//리덕스에서 배열을 통째로 바꾸기때문에 react memo가 필요없음
export default RefRaidCard;
