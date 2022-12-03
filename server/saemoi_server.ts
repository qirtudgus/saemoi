import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { db } from './saemoi_db.js';
import { registerRouter } from './router/register.js';
import { loginRouter } from './router/login.js';
import { jwtCheck } from './middleware/CheckToken.js';
import cookieParser from 'cookie-parser';
import { boardRouter } from './router/board.js';
import { raidBoardRouter } from './router/raidBoard.js';
import { commentRouter } from './router/comment.js';
import { Server } from 'socket.io';
import http from 'http';

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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

var userList: any = [];
io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);
  const socketId = socket.id;
  //접속 시 유저 수와 userList에 고유 소켓값을 넣어서 반환해준다.
  // count++;
  // userList.push(socketId);
  // io.emit('users.count', { userList });

  socket.on('users.count', ({ id }) => {
    console.log('들어온 데이터');
    console.log(id);
    console.log(socketId);

    if (id === '첫접속') {
      io.emit('users.count', userList);
    } else {
      userList.push({ id, socketId: socketId });
      console.log('에밋전에 가공한 유저리스트 데이터');
      console.log(userList);
      io.emit('users.count', userList);
    }
  });

  socket.on('disconnect', function () {
    //소켓이 연결이 끊길 시 고유 소켓값과 유저수를 줄인다.
    let idx = userList.findIndex((i: any) => {
      return i.socketId === socketId;
    });

    console.log('파인드인덱스로 찾은 번호');
    console.log(idx);
    if (idx === -1) {
      io.emit('users.count', userList);
    } else {
      userList.splice(idx, 1);
      io.emit('users.count', userList);
      console.log('연결끊겼을때 유저리스트');
      console.log(userList);
    }
  });
});

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
//레이드게시판 라우터
app.use('/api/raidboard', raidBoardRouter);
//댓글 라우터
app.use('/api/comment', commentRouter);

app.post('/api/test', (req, res) => {
  console.log(req.body);
  db.query('SELECT * FROM users', [], (err, result) => {
    res.status(200).json(result);
  });
});

app.post('/api/loginlist', (req, res) => {
  console.log(req.body);
  console.log(req);
  res.status(200).json('haha');
});

app.listen(SERVER_PORT, () => {
  console.log(`
    🛡️  Server listening on port: ${SERVER_PORT}
  `);
});

server.listen(4000, function () {
  console.log('listening on port 4000');
});
