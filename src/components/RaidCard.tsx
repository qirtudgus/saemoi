import React from 'react';
import styled from 'styled-components';
import { elapsedTime } from '../util/returnTodayString';

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
  & span:first-child {
    margin-right: 5px;
  }
`;

const ListFooterTime = styled.span`
  display: block;
  width: 100%;
  text-align: right;
  margin-right: 0px !important;
`;

const VerticalLine = styled.span`
  display: inline-block;
  border-left: 1px solid #dadde6;
  margin: 0 10px;
  height: 10px;
`;

const RaidCard = (props: any) => {
  return (
    <ListCard>
      <ListTop>
        <span>{props.raidDifficulty}</span>
        <span>{props.monsterName}</span>
        <VerticalLine />
        <span>{props.type}</span>
        <VerticalLine />
        <span>{props.raidCode}</span>
        <ListFooterTime> {elapsedTime(props.date)}</ListFooterTime>
      </ListTop>
      <p>{props.raidText}</p>
      <p>{props.raidOption}</p>
    </ListCard>
  );
};

export default RaidCard;
