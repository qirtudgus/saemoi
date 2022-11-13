import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { db } from './saemoi_db.js';
import { registerRouter } from './router/register.js';
import { loginRouter } from './router/login.js';
import { jwtCheck } from './middleware/CheckToken.js';
import cookieParser from 'cookie-parser';
import { boardRouter } from './router/board.js';

const SERVER_PORT = 3002;
const app = express();
//https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275
app.use(
  cors({
    origin: true, // 출처 허용 옵션
    credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  }),
);
app.use(express.json());
app.use(cookieParser());

db.connect((err: any) => {
  if (err) console.log('MySQL 연결 실패 : ', err);
  console.log('MySQL Connected!!!');
});

//mysql connection 끊김 방지를 위해 1시간마다 쿼리를 날린다.
setInterval(() => {
  db.query('SELECT 1', [], (err, rows, fields) => {
    console.log('커넥션 끊김방지 쿼리');
  });
}, 3600000);

//express req 속성 추가
declare module 'express-serve-static-core' {
  interface Request {
    decoded?: any;
  }
}

// app.use(jwtCheck);
//해당 주소에 들어오는것에만 미들웨어를 체크할 수 있다.
app.use('/api/test', jwtCheck);
//회원가입 라우터
app.use('/api/register', registerRouter);
//로그인 라우터
app.use('/api/login', loginRouter);
//게시판 라우터
app.use('/api/board', boardRouter);

app.post('/api/test', (req, res) => {
  console.log(req.body);
  db.query('SELECT * FROM users', [], (err, result) => {
    res.status(200).json(result);
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`
    🛡️  Server listening on port: ${SERVER_PORT}
  `);
});
