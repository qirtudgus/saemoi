import React, { forwardRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../layout/theme';
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
    flex-shrink: 0;
  }
  & .raidCode {
    color: #42ff42;
    /* color: ${({ theme }) => theme.colors.main}; */
  }
`;

const ListFooterTime = styled.span`
  display: block;
  width: 100%;
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
    <ThemeProvider theme={theme}>
      <ListCard ref={ref}>
        <ListTop>
          <span>{props.raidDifficulty}</span>
          <span>{props.monsterName}</span>
          <VerticalLine />
          <span>{props.type}</span>
          <VerticalLine />
          <span className='raidCode'>{props.raidCode}</span>
          <ListFooterTime> {elapsedTime(props.date)}</ListFooterTime>
        </ListTop>
        {props.raidText !== '' && (
          <p>
            <RaidText>- </RaidText>
            {props.raidText}
          </p>
        )}
        {props.raidOption !== '' && (
          <p>
            <RaidText>- </RaidText>
            {props.raidOption}
          </p>
        )}
      </ListCard>
    </ThemeProvider>
  );
});

export default RefRaidCard;
