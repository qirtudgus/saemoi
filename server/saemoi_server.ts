import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { db } from './saemoi_db.js';
import { registerRouter } from './router/register.js';
import { loginRouter } from './router/login.js';
const SERVER_PORT = 3002;
const app = express();
app.use(cors());
app.use(express.json());

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

//회원가입 라우터
app.use('/api/register', registerRouter);
//로그인 라우터
app.use('/api/login', loginRouter);

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
