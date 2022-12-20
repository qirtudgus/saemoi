import 'moment/locale/ko';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import GaTracker from './components/GaTracker';
import Login from './components/Login';
import Register from './components/Register';
import Sound from './components/Sound';
import 초록불 from './img/onboard.svg';
import GlobalStyles from './layout/GlobalStyles';
import Layout from './layout/Layout';
import LayoutWrite from './layout/LayoutWrite';
import AlarmConfing from './page/AlarmConfig';
import Board from './page/Board';
import BoardSearchResult from './page/BoardSearchResult';
import ErrorPage from './page/ErrorPage';
import Home from './page/Home';
import PostEdit from './page/PostEdit';
import RaidWrite from './page/RaidWrite';
import RealTimeRaidBoard from './page/RealTimeRaidBoard';
import View from './page/View';
import Write from './page/Write';
import { RaidListDispatch } from './store/raidListSlice';
import { MySocKetIdDispatch } from './store/mySocketIdSlice';
import { RaidCountDispatch } from './store/soundSlice';
import { useAppDispatch, useAppSelector } from './store/store';
import { userCountDispatch } from './store/userCountSlice';
const port = process.env.REACT_APP_IO_SERVER_API as string;
export const socket = io(port);

const CountBox = styled.div`
  width: auto;
  height: 40px;
  /* background-color: ${({ theme }) => theme.colors.main}; */
  border: 2px solid ${({ theme }) => theme.colors.main};
  color: #fff;
  margin-right: 10px;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 0.9em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  & img {
    width: 9px;
    margin-right: 3px;
  }
`;
const CountBoxMobile = styled.div`
  width: auto;
  height: 25px;
  /* background-color: ${({ theme }) => theme.colors.main}; */
  border: 2px solid ${({ theme }) => theme.colors.main};
  color: #fff;
  margin-right: 5px;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 0.9em;
  display: none;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  & img {
    width: 9px;
    height: 9px;
    margin-right: 3px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    /* height: 25px; */
  }
`;

export const UserCount = () => {
  // const userCount = useAppSelector((state) => state.userList.length);
  const userCount2 = useAppSelector((state) => state.userCount);
  return (
    <CountBox>
      <img
        src={초록불}
        alt='접속중'
      />
      {userCount2}명 접속중
    </CountBox>
  );
};
export const UserCountMobile = () => {
  // const userCount = useAppSelector((state) => state.userList.length);
  const userCount2 = useAppSelector((state) => state.userCount);
  return (
    <CountBoxMobile>
      <img
        src={초록불}
        alt='접속중'
      />
      {userCount2}명 접속중
    </CountBoxMobile>
  );
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on('raidList', function (payload) {
      dispatch(RaidListDispatch(payload));
    });
    socket.on('userCount', function (payload) {
      dispatch(userCountDispatch(payload));
    });
    socket.on('raidCount', function (payload) {
      dispatch(RaidCountDispatch(payload));
    });
    socket.on('mySocketId', function (payload) {
      dispatch(MySocKetIdDispatch(payload));
    });
  }, []);

  useEffect(() => {
    let Check = (e: any) => {
      let uiBox = document.getElementById('OpenMenuCheck');
      if (!e.target.classList.value.match('menuOpenCheck')) {
        uiBox?.classList.remove('active');
      }
      return;
    };
    document.addEventListener('click', Check);
    return () => {
      document.removeEventListener('click', Check);
    };
  }, []);

  useEffect(() => {
    // 브라우저가 알림을 지원하는지 확인
    if (!('Notification' in window)) {
      alert('이 브라우저는 알림을 지원하지 않습니다.');
    } else {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
        if (permission === 'granted') {
          alert('알람이 허용되어있습니다!');
        } else {
          alert('알람이 거절되어있습니다!');
        }
      });
    }
  }, []);

  useEffect(() => {
    //사파리 알람 이슈 해결코드
    const playZeroVolumeAudio = () => {
      let audioElement = document.getElementById('alarmSound') as HTMLAudioElement;
      audioElement.load();
      audioElement.muted = true;
      audioElement.play();

      document.body.removeEventListener('click', playZeroVolumeAudio);
      document.body.removeEventListener('touchstart', playZeroVolumeAudio);
    };

    document.body.addEventListener('click', playZeroVolumeAudio);
    document.body.addEventListener('touchstart', playZeroVolumeAudio);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Sound />
      <GaTracker />
      {/* <button
        onClick={() => {
          new Notification('안녕!');
        }}
      >
        웹 알람테스트
      </button> */}
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route element={<LayoutWrite />}>
          <Route
            path='/raidboard/write'
            element={<RaidWrite />}
          ></Route>
        </Route>
        <Route element={<Layout />}>
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/board/list'
            element={<Board />}
          ></Route>
          <Route
            path='/board/write'
            element={<Write />}
          />
          <Route
            path='/board/posts/:number'
            element={<View />}
          />
          <Route
            path='/board/edit/:number'
            element={<PostEdit />}
          />
          <Route
            path='/board/list/search/:keyword'
            element={<BoardSearchResult />}
          />
          {/* 
          <Route
            path='/query'
            element={<List />}
          ></Route> */}
          {/* 
          <Route
            path='/socket'
            element={<SocketTest />}
          ></Route> */}
          <Route
            path='/realtimeraidboard'
            element={<RealTimeRaidBoard />}
          ></Route>
          {/* <Route
            path='/raidboard/list'
            element={<RaidBoard />}
          ></Route> */}
          <Route
            path='/config'
            element={<AlarmConfing />}
          />
          <Route
            path='*'
            element={<ErrorPage />}
          ></Route>
        </Route>
        {/* <Route
          path='/test'
          element={<ArrayTest />}
        ></Route> */}
      </Routes>
    </>
  );
}

export default App;
