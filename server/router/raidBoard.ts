import express, { Request, Response, NextFunction } from 'express';
import { db } from '../saemoi_db.js';
export const raidBoardRouter = express.Router();

//게시물 작성하기
raidBoardRouter.post('/list', (req, res) => {
  let {
    nickname,
    raidCode,
    monsterName,
    type,
    positionState = '',
    raidDifficulty,
    optionList,
    etcText,
    date,
  } = req.body;
  let insertQuery =
    'INSERT INTO raidboard (nickname,raidCode,monsterName,type,raidPosition, raidDifficulty, raidOption,raidText,date) VALUES (?,?,?,?,?,?,?,?,?)';
  db.query(
    insertQuery,
    [nickname, raidCode, monsterName, type, positionState, raidDifficulty, optionList.join(', '), etcText, date],
    (err, rows) => {
      console.log('게시물 등록 완료');
      console.log(err);
    },
  );
  res.status(200).json('등록완료');
});

raidBoardRouter.get('/list', (req, res) => {
  let board = 'SELECT * FROM raidboard';
  db.query(board, [], (err, rows) => {
    console.log(err);

    res.status(200).json(rows.reverse());
  });
});
