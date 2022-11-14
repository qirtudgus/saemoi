import express, { Request, Response, NextFunction } from 'express';
import { db } from '../saemoi_db.js';
export const boardRouter = express.Router();

boardRouter.get('/', (req, res) => {
  let board = 'SELECT (`index`), title, date, nickname FROM board';
  db.query(board, [], (err, rows) => {
    console.log(err);
    console.log(rows);
    res.send(rows);
  });
});

boardRouter.post('/', (req, res) => {
  let { title, content, date, nickname } = req.body;
  let insertQuery = 'INSERT INTO board (title,content,date,nickname) VALUES (?,?,?,?)';
  db.query(insertQuery, [title, content, date, nickname], (err, rows) => {
    console.log('게시물 등록 완료');
    console.log(err);
    console.log(rows);
    res.status(200).json('등록완료');
  });
});

boardRouter.get('/view', (req, res) => {
  let board = 'SELECT * FROM board WHERE (`index` = ?)';
  let boardNumber = req.query.number;
  interface BoardInterface {
    title: string;
    content: string;
  }
  db.query(board, [boardNumber], (err, rows) => {
    console.log(err);
    console.log(rows[0]);
    let contentResult: BoardInterface = rows[0];
    res.send(contentResult);
  });
});
