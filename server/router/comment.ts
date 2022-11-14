import express, { Request, Response, NextFunction } from 'express';
import { db } from '../saemoi_db.js';
export const commentRouter = express.Router();

//댓글 작성
commentRouter.post('/write', (req, res) => {
  const { board_index, content2, date, id, nickname } = req.body;
  let commentWriteQuery =
    'INSERT INTO commentTable (board_index,content,date,nickname, id, latestEditDate) VALUES (?,?,?,?,?,?)';
  let commentCountCreate = 'UPDATE board SET commentCount = commentCount + 1 WHERE (`index` = ?)';

  db.query(commentWriteQuery, [board_index, content2, date, nickname, id, ''], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(403).json({ error: '댓글 작성에 실패하였습니다.' });
    } else {
      db.query(commentCountCreate, [board_index], (err, rows) => {
        console.log('댓글 등록 완료');
        res.status(200).json('댓글 등록 완료');
      });
    }
  });
});

//댓글 삭제
commentRouter.delete('/', (req, res) => {
  const commentNumber = req.query.commentNumber;
  const boardNumber = req.query.boardNumber;
  let commentDelete = 'DELETE FROM commentTable WHERE (`index`=?)';
  let commentCountDelete = 'UPDATE board SET commentCount = commentCount -1 WHERE (`index` = ?)';
  db.query(commentDelete, [commentNumber], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(403).json({ error: '댓글 삭제에 실패하였습니다.' });
    } else {
      db.query(commentCountDelete, [boardNumber], (err, rows) => {
        console.log('댓글 삭제 완료');
        res.status(200).json('댓글 삭제 완료');
      });
    }
  });
});
