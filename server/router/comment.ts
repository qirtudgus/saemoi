import express, { Request, Response, NextFunction } from 'express';
import { db } from '../saemoi_db.js';
export const commentRouter = express.Router();

//댓글 작성
commentRouter.post('/write', (req, res) => {
  //max함수를 이용하자
  // 0. index는 AI로 자동으로 1씩 증가한다.
  // 1. board_index는 board_index값을 넣는다.
  // 2. comment_index는 댓글의 index를 넣는다.
  // 3. content는 content를 넣는다.
  // 4. depth는 depth를 넣는다. (댓글은 0, 대댓글은 1)
  // 댓글일 경우
  // 5. order는 같은 board_index에서 가장 큰 order를 가진 값에 +1 해준다.

  let depth = 0;
  const { board_index, content2, date, id, nickname } = req.body;
  // let commentWriteQuery = 'INSERT INTO commenttable (board_index,content,date,nickname, id) VALUES (?,?,?,?,?)';

  //작성한 다음에 해당 index를 comment_index에 저장하자
  let 인덱스쿼리 = 'SELECT LAST_INSERT_ID()';
  let commentWriteQuery = 'INSERT INTO commenttable (board_index,content,date,nickname, id) VALUES (?,?,?,?,?)';
  let commentCountCreate = 'UPDATE board SET commentCount = commentCount + 1 WHERE (`index` = ?)';
  let 같은인덱스찾아서값저장 = 'UPDATE commenttable SET comment_index = ? WHERE (`index` = ?)';

  db.query(commentWriteQuery, [board_index, content2, date, nickname, id], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(403).json({ error: '댓글 작성에 실패하였습니다.' });
    } else {
      db.query(commentCountCreate, [board_index], (err, rows) => {
        console.log('댓글 등록 완료');
        console.log(rows);
        //이때 인덱스를 추가해주자
        db.query(인덱스쿼리, [], (err, rows) => {
          console.log(rows[0]['LAST_INSERT_ID()']);
          let 인덱스 = Number(rows[0]['LAST_INSERT_ID()']);
          db.query(같은인덱스찾아서값저장, [인덱스, 인덱스], (err, rows) => {
            console.log(rows);
          });
        });

        res.status(200).json('댓글 등록 완료');
      });
    }
  });
});

//댓글 삭제
commentRouter.delete('/', (req, res) => {
  const commentNumber = req.query.commentNumber;
  const boardNumber = req.query.boardNumber;
  let commentDelete = 'DELETE FROM commenttable WHERE (`index`=?)';
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

//대댓글 삭제(isDeleted 값만 true로 변경)
commentRouter.put('/', (req, res) => {
  const commentNumber = req.query.commentNumber;
  const boardNumber = req.query.boardNumber;
  let commentDeleted = 'UPDATE commenttable SET isDeleted = "true" WHERE (`index` = ?)';
  let commentCountDelete = 'UPDATE board SET commentCount = commentCount -1 WHERE (`index` = ?)';
  db.query(commentDeleted, [commentNumber], (err, rows) => {
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

//대댓글 작성
//필요한 데이터는...대댓글을 달 댓글의 index와 내용,아이디,닉네임,날짜
//불러올때는 댓글 객체에 대댓글 속성을 생성하고
//1.댓글 인덱스에 맞는 대댓글 객체를 대댓글 속성에 할당한다? 그리고 맵함수를 중첩하여 출력?
//2. 댓글 객체에 대댓글 객체도 같이 넣어둔다.
//2-1. 1차 맵함수에서 댓글index와 대댓글의 board_index가 같을 경우에 렌더링

//테이블을 다시 짜자
// 하나의 테이블에서 댓글과 대댓글을 전부 가져오는 계층 구조가 맞는듯하다.
// 추가할 컬럼은 댓글이 깊이를 따지는 depth 기본은 0으로 가지고, 대댓글 api때만 1로 저장 렌더링시 0과 1로 구분한다.

// 댓글의 순서를 나타내는 order 기본은 0으로 가지고,
//클라이언트에서 받아온 order값에 +1 하여 저장해준다. 렌더링 시 order를 정렬하여 쭉 나열한다.

// 삭제 여부를 나타내는 isDelete 기본은 false 삭제시 true

commentRouter.post('/write/nested', (req, res) => {
  console.log(req.body);
  //max함수를 이용하자
  // 0. index는 AI로 자동으로 1씩 증가한다.
  // 1. board_index는 board_index값을 넣는다.
  // 2. comment_index는 댓글의 comment_index를 넣는다.
  // 3. content는 content를 넣는다.
  // 4. depth는 depth를 넣는다. (댓글은 0, 대댓글은 1)
  // 대댓글일 경우
  // 5. order는 같은 board_index 와 comment_index를 가진 row중에서 가장 큰 order값을 넣는다.

  let depth = 1;
  let { board_index, comment_index, content, date, id, nickname } = req.body;

  //같은 인덱스인 게시물을 찾았고..이중에 가장 큰 order를 조회해야했다.
  let 찾기3 = 'SELECT MAX(orders) FROM commenttable WHERE board_index = ? AND comment_index = ?';

  //
  let commentWriteQuery =
    'INSERT INTO commenttable (board_index,content,date,nickname, id, orders, depth, comment_index) VALUES (?,?,?,?,?,?,?,?)';
  let commentCountCreate = 'UPDATE board SET commentCount = commentCount + 1 WHERE (`index` = ?)';

  db.query(찾기3, [board_index, comment_index.toString()], (err, rows) => {
    console.log(err);
    console.log(rows[0]['MAX(orders)']);
    let orders = Number(rows[0]['MAX(orders)']) + 1; //가장 큰 order에서 +1 해준다.
    //대댓글은 무조건 댓글에만 가능하여 orders의 예외값은 없다.
    db.query(
      commentWriteQuery,
      [board_index, content, date, nickname, id, orders, depth, comment_index],
      (err, rows) => {
        db.query(commentCountCreate, [board_index], (err, rows) => {
          console.log('대댓글 등록완료');
          res.status(200).json('대댓글 등록 완료');
        });
      },
    );
  });
});
