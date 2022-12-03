import express, { Request, Response, NextFunction } from 'express';
import { db } from '../saemoi_db.js';
export const raidBoardRouter = express.Router();

//게시물 작성하기
raidBoardRouter.post('/list', (req, res) => {
  let { nickname, raidCode, monsterName, type, positionState, difficultyState, optionList, etcText, date } = req.body;
  console.log(raidCode);
  console.log(monsterName);
  console.log(type);
  console.log(positionState);
  console.log(difficultyState);
  console.log(optionList);
  let insertQuery =
    'INSERT INTO raidboard (nickname,raidCode,monsterName,type,raidPosition, raidDifficulty, raidOption,raidText,date) VALUES (?,?,?,?,?,?,?,?,?)';
  db.query(
    insertQuery,
    [nickname, raidCode, monsterName, type, positionState, difficultyState, optionList.join(' / '), etcText, date],
    (err, rows) => {
      console.log('게시물 등록 완료');
      console.log(err);
      console.log(rows);
    },
  );
  res.status(200).json('등록완료');
});

raidBoardRouter.get('/list', (req, res) => {
  let board = 'SELECT * FROM raidboard';
  db.query(board, [], (err, rows) => {
    console.log(err);
    console.log(rows);
    res.status(200).json(rows.reverse());
  });
});
