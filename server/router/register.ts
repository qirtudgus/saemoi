import express, { Request, Response, NextFunction } from 'express';
import createHashPassword from '../../src/util/createHashPassword.js';
import { db } from '../saemoi_db.js';
export const registerRouter = express.Router();

registerRouter.post('/join', (req, res) => {
  const { id, nick, pw } = req.body;
  const { salt, hashPassword } = createHashPassword(pw);

  console.log(id, pw, nick);
  const idCheck = 'SELECT * FROM users WHERE id = ?';
  const nicknameCheck = 'SELECT * FROM users WHERE nickname = ?';
  const joinQuery = 'INSERT INTO users (id,password,salt,nickname) VALUES (?,?,?,?)';

  //아이디 중복검사
  db.query(idCheck, [id], function (err, rows, fields) {
    if (rows[0] === undefined) {
      console.log('사용가능한 아이디');
      //아이디 사용 가능 시 닉네임 체크
      db.query(nicknameCheck, [nick], function (err, rows, fields) {
        if (rows[0] === undefined) {
          console.log('사용가능한 닉네임');
          //아이디와 닉네임 모두 사용 가능할 시
          db.query(joinQuery, [id, hashPassword, salt, nick], (err, rows) => {
            console.log('회원가입 완료');
            res.status(200).json({ errorCode: 0 });
          });
        } else if (rows[0]) {
          console.log('중복되는 닉네임');
          res.status(200).json({ errorCode: 2 });
        }
      });
    }
    //아이디 중복 시 false를 응답.
    else if (rows[0]) {
      console.log('중복되는 아이디');
      res.status(200).json({ errorCode: 1 });
      return;
    }
  });
});
