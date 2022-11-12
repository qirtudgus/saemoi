import express, { Request, Response, NextFunction } from 'express';
import createAccessToken from '../../src/util/createAccessToken.js';
import verifyToken from '../../src/util/verifyToken.js';
import { db } from '../saemoi_db.js';

export const jwtCheck = (req: Request, res: Response, next: NextFunction) => {
  //헤더값 조회
  console.log(req.path);
  //쿠키값 조회
  //로그인 요청은 분기한다.
  if (req.path === '/api/login') {
    next();
  } else {
    let id = req.cookies.id;
    let AT = req.cookies.AT;
    let RT = req.cookies.RT;

    console.log(id);
    console.log(AT);
    console.log(RT);

    console.log('쿠키속의 토큰 확인');
    //   console.log(req.decoded.id);
    //액세스토큰이 아예 없다면 에러 반환
    if (req.headers.authorization === undefined) return res.status(401).json({ error: '토큰이 없습니다.' });
    let ATverifyResult = verifyToken(AT); // 만료 시 null 이 할당된다.
    if (ATverifyResult === null) {
      console.log('액세스토큰이 만료되었습니다.');
      //AT가 만료 시 RT 확인
      db.query('SELECT refreshToken FROM users WHERE id = ?', [id], (err, rows) => {
        let dbRT = rows[0].refreshToken;
        let RTverifyResult = verifyToken(dbRT); // 만료 시 null 이 할당된다.
        //RT도 만료됐을 시, DB에서 토큰을 지우고 재로그인 유도
        if (RTverifyResult === null) {
          console.log('리프레쉬토큰이 만료되었습니다.');
          db.query('UPDATE users SET refreshToken = ? WHERE id = ?', ['', id], (err, rows) => {
            res.clearCookie('id');
            res.clearCookie('AT');
            res.clearCookie('RT');
            return res.status(401).json({ error: '리프레쉬토큰이 만료되었습니다.' });
          });
        }
        //RT는 유효할 시
        else {
          console.log('리프레쉬토큰은 유효하여 액세스토큰만 재생성합니다.');
          const newAT = createAccessToken(id) as string;
          res.cookie('AT', newAT);
          req.cookies.AT = newAT;
          next();
        }
      });
    } else {
      console.log('액세스 토큰이 유효합니다.');
      next();
    }
  }
};
