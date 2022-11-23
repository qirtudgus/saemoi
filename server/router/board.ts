import express, { Request, Response, NextFunction } from 'express';
import { db } from '../saemoi_db.js';
export const boardRouter = express.Router();

//게시물 좋아요
boardRouter.put('/like', (req, res) => {
  let likeQuery =
    'UPDATE board SET likes = likes +1, likeUserList = CONCAT_WS("",likeUserList, ? ",") WHERE (`index` =   ?  )';
  let unlikeQuery =
    'UPDATE board SET likes = likes -1, likeUserList = replace(likeUserList, ? , "" ) WHERE (`index` =   ?  )';

  let boardNumber = req.query.number;
  let id = req.query.id;
  let behavior = req.query.behavior;
  let id2 = id + ',';
  console.log(id2);

  //쿼리스트링의 behavior값이 1이면  추천, 0이면 추천취소
  if (behavior === '1') {
    db.query(likeQuery, [id, boardNumber], (err, rows) => {
      console.log(err);
      console.log(rows);
      res.status(201).json('추천 완료');
    });
  } else {
    db.query(unlikeQuery, [id2, boardNumber], (err, rows) => {
      console.log(err);
      console.log(rows);
      res.status(201).json('추천취소 완료');
    });
  }
});

//게시물 조회수 증가
boardRouter.put('/view', (req, res) => {
  let boardNumber = req.query.number;
  let viewUpdate = 'UPDATE board SET view = view +1 WHERE (`index`=?)';
  db.query(viewUpdate, [boardNumber], (err, rows) => {
    res.send(200);
  });
});

//게시물 리스트 불러오기
boardRouter.get('/', (req, res) => {
  let board = 'SELECT (`index`), title, date, nickname,commentCount,view,likes FROM board';
  db.query(board, [], (err, rows) => {
    console.log(err);
    console.log(rows);
    res.status(200).json(rows.reverse());
  });
});

//게시물 작성하기
boardRouter.post('/', (req, res) => {
  let { title, content, date, nickname, id } = req.body;
  let insertQuery = 'INSERT INTO board (title,content,date,nickname, id, latestEditDate) VALUES (?,?,?,?,?,?)';
  db.query(insertQuery, [title, content, date, nickname, id, ''], (err, rows) => {
    console.log('게시물 등록 완료');
    console.log(err);
    console.log(rows);
    res.status(200).json('등록완료');
  });
});

//게시물보기
//댓글도 같이 응답해줘야한다..
//대댓글도 같이 응답해줘야한다..
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
    // console.log(err);
    // console.log('게시물 보기 결과');
    // console.log(rows[0]);
    let contentResult: BoardInterface = rows[0];
    if (rows[0] === undefined) {
      res.status(201).json({ errorCode: 3 });
    } else {
      //댓글 불러오기
      let commentQuery =
        'SELECT (`index`), id, nickname, content, date, orders, depth, comment_index, isDeleted FROM commentTable WHERE board_index = ?';
      db.query(commentQuery, [boardNumber], (err, rows) => {
        //이제 nestedCommentTable에서 comment의 index와 동일한 row만 뽑아온다.
        // 댓글 정렬 뒤 할당
        let 댓글정렬 = rows.sort((c: any, d: any) => {
          return c.comment_index < d.comment_index ? -1 : 1;
        });
        // 정렬한 댓글에서 삭제된 콘텐츠 필터링
        let 삭제된댓글 = 댓글정렬.map((i: any) => {
          return i.isDeleted === 'true' ? { ...i, content: '삭제된 댓글입니다.' } : { ...i };
        });

        contentResult.comment = 삭제된댓글;

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

// 게시물 검색결과
boardRouter.get('/search:?', (req, res) => {
  const keyword = req.query.keyword;
  console.log(keyword);

  let searchQuery = 'SELECT * FROM board WHERE title LIKE ?';

  db.query(searchQuery, ['%' + keyword + '%'], (err, rows) => {
    console.log(err);
    console.log(rows);
    res.status(200).json(rows.reverse());
  });
});

boardRouter.get('/list', (req, res, next) => {
  const currentPageNum = Number(req.query.page);
  console.log(req.query);
  console.log(currentPageNum);
  let board = 'SELECT (`index`), title, date, nickname,commentCount,view,likes FROM board';

  db.query(board, [], (err, rows, fields) => {
    //정렬
    let sortList = rows.reverse();
    //100까지만 자르기
    let sliceArr = sortList.slice(0, 200);
    interface data {
      data?: [];
      listNum?: number;
    }

    let payload: data = {};
    //페이지넘버를 요청했을 때
    let pageNumber = (currentPageNum - 1) * 10; // 0
    // console.log(currentPageNum)
    payload.data = sliceArr.slice(pageNumber, pageNumber + 9 + 1); // 0~9 까지 10개를 넘겨준다.

    payload.listNum = Math.ceil(sliceArr.length / 10); // 10으로 나눈 뒤 반올림하여 필요한 페이지 갯수(정수)를 넘겨준다.

    console.log(payload);

    res.status(200).json({
      payload: {
        data: sliceArr.slice(pageNumber, pageNumber + 9 + 1),
        listNum: Math.ceil(sliceArr.length / 10),
      },
    });
  });

  //   db.query(loginQuery, [userId], (err, rows, fields) => {
  //     const uesrInfo = userInfoProcess(rows[0]);
  //     res.status(200).json({ code: 200, userInfo: uesrInfo });
  //   });
});
