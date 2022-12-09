import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import moment from 'moment';
import schedule from 'node-schedule';
import { Server } from 'socket.io';
import { jwtCheck } from './middleware/CheckToken.js';
import { boardRouter } from './router/board.js';
import { commentRouter } from './router/comment.js';
import { loginRouter } from './router/login.js';
import { raidBoardRouter } from './router/raidBoard.js';
import { registerRouter } from './router/register.js';
import { db } from './saemoi_db.js';

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
  pingInterval: 30000,
  pingTimeout: 20000,
  cors: {
    origin: '*',
    credentials: true,
  },
});

var userCount = 0;
var raidCount = 0;
let deleteSeconds = 180;
var userList: any = [];
var raidList: {
  monsterName: string;
  raidDifficulty: string;
  raidCode: string;
  type: string;
  date: string;
  deleteDate: string;
  raidText: string;
  raidOption: string;
}[] = [];

io.on('connection', (socket) => {
  const socketId = socket.id;
  userCount++;

  socket.emit('newPost', false);
  // socket.on('newPost', () => {
  //   io.emit('newPost', true);
  // });
  socket.on('newPost', (payload) => {
    io.emit('newPost', true);
  });

  socket.on('soundTest', (payload) => {
    socket.emit('soundTest', 'test');
  });
  io.emit('userCount', userCount);
  io.emit('raidCount', raidCount);

  console.log('a user connected');
  socket.emit('raidList', raidList);
  socket.on('RefreshraidList', () => {
    console.log('새로고침 요청');
    io.emit('raidList', raidList);
  });
  socket.on('raidList', (payload) => {
    console.log('신규 레이드 등록!');
    raidCount++;
    //값이 들어오면 소리를 내기위해 newPost에 메시지를 쏜다
    socket.broadcast.emit('newPost', true);
    //페이로드엔 등록한 레이드 객체가 들어있음
    raidList.unshift(payload);
    //등록시간이 3분(180초)지난것을 제외시킴.
    // 1 - 삭제시간을 등록하여 로직을 변경할 수 있다 (삭제시간이 넘어간것)
    // let three = raidList.filter((i, index) => {
    //   if (moment().diff(i.date, 'seconds') < deleteSeconds) return i;
    // });
    // raidList = [...three];
    io.emit('raidList', raidList);
    io.emit('raidCount', raidCount);

    //db에 저장시켜주자..
    let {
      nickname,
      raidCode,
      monsterName,
      type,
      positionState = '',
      difficultyState,
      optionList,
      etcText,
      date,
    } = payload;
    let insertQuery =
      'INSERT INTO raidboard (nickname,raidCode,monsterName,type,raidPosition, raidDifficulty, raidOption,raidText,date) VALUES (?,?,?,?,?,?,?,?,?)';
    db.query(
      insertQuery,
      [nickname, raidCode, monsterName, type, positionState, difficultyState, optionList, etcText, date],
      (err, rows) => {
        console.log('게시물 등록 완료');
        console.log(err);
      },
    );
  });

  //사용자 연결이 끊겼을 때..
  socket.on('disconnect', function (reason) {
    console.log('소켓 끊긴 이유');
    console.log(reason);
    userCount--;
    console.log('undecreas!', userCount);
    io.emit('userCount', userCount);
  });
});

// 10초마다 한번씩 레이드 정리
setInterval(() => {
  //보내줄 레이드가 없을때는 stop
  if (raidList.length === 0) {
    console.log('등록된 리스트가 없습니다.');
    return;
  } else {
    //데드라인을 넘긴게 있는지 확인한 뒤 없다면 return
    let check = raidList.findIndex((i) => {
      console.log(moment().diff(i.date, 'seconds'));
      return moment().diff(i.date, 'seconds') > deleteSeconds;
    });
    if (check === -1) {
      console.log('삭제할 배열이 없습니다.');
      return;
    } else {
      let three = raidList.filter((i, index) => {
        if (moment().diff(i.date, 'seconds') < deleteSeconds) return i;
      });
      // TimeOutDel(raidList)
      raidList = [...three];
      io.emit('raidList', raidList);
    }
  }
}, 10000);

//5초마다 한번씩 종료된레이드 구분을 위해 보내주었지만 쓰지말자.
// setInterval(() => {
//   if (raidList.length === 0) return;
//   io.emit('raidList', raidList);
// }, 5000);

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

const Job = () => {
  console.log('레이드리스트 정리');
  raidList = [];
  io.emit('raidList', raidList);
};

const job = schedule.scheduleJob('0 0 * * *', function () {
  console.log(new Date());
  console.log('노드 스케쥴 호출');
  Job();
});

//socketio와 http 포트를 동일하게 사용하는 법
//https://doc.scalingo.com/languages/nodejs/websocket-web-same-port
server.listen(SERVER_PORT, () => {
  console.log(`
    🛡️  Server listening on port: ${SERVER_PORT}
  `);
});

// server.listen(3002, function () {
//   console.log('listening on port 4000');
// });
