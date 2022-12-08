import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled, { ThemeProvider } from 'styled-components';
import Login from './components/Login';
import Register from './components/Register';
import 초록불 from './img/onboard.svg';
import GlobalStyles from './layout/GlobalStyles';
import Layout from './layout/Layout';
import LayoutWrite from './layout/LayoutWrite';
import theme from './layout/theme';
import ArrayTest from './page/ArrayTest';
import Board from './page/Board';
import BoardSearchResult from './page/BoardSearchResult';
import ErrorPage from './page/ErrorPage';
import Home from './page/Home';
import PostEdit from './page/PostEdit';
import List from './page/QueryTest';
import RaidBoard from './page/RaidBoard';
import RaidWrite from './page/RaidWrite';
import SocketTest from './page/SocketTest';
import View from './page/View';
import Write from './page/Write';
import { useAppDispatch, useAppSelector } from './store/store';
import { userCountDispatch } from './store/userCountSlice';
import 'moment/locale/ko';
import RealTimeRaidBoard from './page/RealTimeRaidBoard';
import Sound from './components/Sound';
import AlarmConfing from './page/AlarmConfig';
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

  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    /* height: 25px; */
  }
  & img {
    width: 9px;
    margin-right: 3px;
  }
`;

export const UserCount = () => {
  // const userCount = useAppSelector((state) => state.userList.length);
  const userCount2 = useAppSelector((state) => state.userCount);
  return (
    <ThemeProvider theme={theme}>
      <CountBox>
        <img
          src={초록불}
          alt='접속중'
        />
        {userCount2}명 접속중
      </CountBox>
    </ThemeProvider>
  );
};
export const UserCountMobile = () => {
  // const userCount = useAppSelector((state) => state.userList.length);
  const userCount2 = useAppSelector((state) => state.userCount);
  return (
    <ThemeProvider theme={theme}>
      <CountBoxMobile>
        <img
          src={초록불}
          alt='접속중'
        />
        {userCount2}명 접속중
      </CountBoxMobile>
    </ThemeProvider>
  );
};

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('app 렌더링');
    socket.on('userCount', function (payload) {
      console.log(payload);
      dispatch(userCountDispatch(payload));
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
    //사파리 알람 이슈 해결코드
    const play = () => {
      console.log('언락 오디오');
      let a = document.getElementById('alarmSound') as HTMLAudioElement;

      a.muted = true;
      a.load();
      a.play();

      document.body.removeEventListener('click', play);
      document.body.removeEventListener('touchstart', play);
    };

    document.body.addEventListener('click', play);
    document.body.addEventListener('touchstart', play);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Sound />

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
          {/* <Route
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
          /> */}
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
          <Route
            path='/raidboard/list'
            element={<RaidBoard />}
          ></Route>
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
