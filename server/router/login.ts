import express, { Request, Response, NextFunction } from 'express';
import checkHashPassword from '../../src/util/checkHashPassword.js';
import { createAccessToken, createRefreshToken } from '../../src/util/createAccessToken.js';
import verifyToken from '../../src/util/verifyToken.js';
import { db } from '../saemoi_db.js';
export const loginRouter = express.Router();

const findUserQuery = 'SELECT * FROM users WHERE id = ?';
const insertTokenQuery = 'UPDATE users SET refreshToken = ? WHERE id = ?';

loginRouter.post('/', async (req, res, next) => {
  const { id, pw } = req.body;
  db.query(findUserQuery, [id], (err, result) => {
    if (result[0] === undefined) {
      console.log('없는 아이디야');
      res.status(200).json({ errorcode: 100, error: '존재하지 않는 아이디입니다.' });
    } else {
      console.log('있는 아이디네 비밀번호 체크하자');
      let hashResult = checkHashPassword(pw, result[0].password, result[0].salt);
      console.log(`비밀번호 확인 결과 ${hashResult}`);
      if (hashResult === false) {
        console.log('비밀번호가 틀렸어.');
        res.status(200).json({ errorcode: 101, error: '비밀번호가 틀렸습니다.' });
      } else {
        let nickname = result[0].nickname;

        console.log('로그인 체크 성공!');
        const AT = createAccessToken(req.body.id) as string;
        const RT = createRefreshToken(req.body.id);
        req.decoded = verifyToken(AT);
        console.log(req.decoded);
        //쿠키설정
        res.cookie('id', id, { httpOnly: true });
        res.cookie('AT', AT, { httpOnly: true });
        res.cookie('RT', RT, { httpOnly: true });
        res.cookie('nickname', nickname, { httpOnly: true });
        console.log(req.cookies);

        db.query(insertTokenQuery, [RT, id]);
        res.status(200).json({ id, AT, RT, isLogin: true, nickname });
        // next();
      }
    }
  });
});

loginRouter.post('/autologin', async (req, res, next) => {
  console.log('자동로그인이 받아온 쿠키의 토큰');
  let ATresult = verifyToken(req.cookies.AT);
  let RTresult = verifyToken(req.cookies.RT);
  console.log('자동 로그인 토큰 만료 유무');
  console.log(ATresult);
  if (ATresult === null) {
    if (RTresult === null) {
      res.clearCookie('id');
      res.clearCookie('AT');
      res.clearCookie('RT');
      res.clearCookie('nickname');
      res.status(401).json({
        id: '',
        isLogin: false,
        nickname: '',
      });
    } else {
      const newAT = createAccessToken(req.cookies.id) as string;
      res.cookie('AT', newAT);
      req.cookies.AT = newAT;
      res.status(200).json({
        id: req.cookies.id,
        isLogin: true,
        nickname: req.cookies.nickname,
      });
    }
  } else {
    res.status(200).json({
      id: req.cookies.id,
      isLogin: true,
      nickname: req.cookies.nickname,
    });
  }
});

loginRouter.post('/logout', async (req, res, next) => {
  res.clearCookie('id');
  res.clearCookie('AT');
  res.clearCookie('RT');
  res.clearCookie('nickname');
  res.status(401).json({
    id: '',
    isLogin: false,
    nickname: '',
  });
});
