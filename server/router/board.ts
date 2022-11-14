import express, { Request, Response, NextFunction } from 'express';
import { db } from '../saemoi_db.js';
export const boardRouter = express.Router();

//게시물 리스트 불러오기
boardRouter.get('/', (req, res) => {
  let board = 'SELECT (`index`), title, date, nickname,commentCount FROM board';
  db.query(board, [], (err, rows) => {
    console.log(err);
    console.log(rows);
    res.send(rows);
  });
});

//게시물 작성하기
boardRouter.post('/', (req, res) => {
  let { title, content, date, nickname, id } = req.body;
  let insertQuery = 'INSERT INTO board (title,content,date,nickname, id) VALUES (?,?,?,?,?)';
  db.query(insertQuery, [title, content, date, nickname, id], (err, rows) => {
    console.log('게시물 등록 완료');
    console.log(err);
    console.log(rows);
    res.status(200).json('등록완료');
  });
});

//게시물보기
//댓글도 같이 응답해줘야한다..
boardRouter.get('/posts', (req, res) => {
  let board = 'SELECT * FROM board WHERE (`index` = ?)';
  let boardNumber = req.query.number;
  interface BoardInterface {
    title: string;
    content: string;
    date: string;
    nickname: string;
    id: string;
    index: string;
    latestEditDate: string;
    comment: CommentInterface[];
  }
  interface CommentInterface {
    index: string;
    content: string;
    nickname: string;
    id: string;
    date: string;
  }
  db.query(board, [boardNumber], (err, rows) => {
    console.log(err);
    console.log('게시물 보기 결과');
    console.log(rows[0]);
    let contentResult: BoardInterface = rows[0];
    if (rows[0] === undefined) {
      res.status(201).json({ errorCode: 3 });
    } else {
      //댓글 불러오기
      let commentQuery = 'SELECT (`index`), id, nickname, content, date FROM commentTable WHERE board_index = ?';
      db.query(commentQuery, [boardNumber], (err, rows) => {
        contentResult.comment = rows;
        res.status(200).json(contentResult);
      });
    }
  });
});

//게시물 삭제하기
boardRouter.delete('/posts', (req, res) => {
  let postDelete = 'DELETE FROM board WHERE (`index`=?)';
  let boardNumber = req.query.number;
  console.log(boardNumber);
  db.query(postDelete, [boardNumber], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ text: '게시물이 삭제되었습니다.' });
    }
  });
});

//게시물 수정하기
boardRouter.put('/edit', (req, res) => {
  let postEdit = 'UPDATE board SET title = ?, content =?, latestEditDate = ? WHERE (`index`=?)';
  let boardNumber = req.query.number;
  let { title, content, latestEditDate } = req.body;
  console.log(boardNumber);
  db.query(postEdit, [title, content, latestEditDate, boardNumber], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ text: '게시물이 수정되었습니다.' });
    }
  });
});
