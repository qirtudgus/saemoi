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
import RaidBoard from './page/RaidBoard';
import RaidWrite from './page/RaidWrite';
import View from './page/View';
import Write from './page/Write';
import { useAppDispatch, useAppSelector } from './store/store';
import { userCountDispatch } from './store/userCountSlice';
const port = process.env.REACT_APP_IO_SERVER_API as string;
const socket = io(port);

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
    //소켓 이벤트마다 현재 접속자를 가져와준다..
    // socket.on('users.count', function (payload) {
    //   console.log(payload);
    //   dispatch(connectedUser(payload));
    // });
    socket.on('userCount', function (payload) {
      console.log(payload);
      dispatch(userCountDispatch(payload));
    });
  }, []);

  useEffect(() => {
    let Check = (e: any) => {
      console.log(e.target);
      console.log(e.target.classList.value);
      let a = 'menuOpenCheck';
      let uiBox = document.getElementById('OpenMenuCheck');

      if (a.match('menuOpenCheck')) {
        //들어있을 때 uiBox 클래스 제거
        console.log('오픈체크메뉴가 들어있음');
        uiBox?.classList.remove('on');
      }

      // console.log(e.currentTarget);
    };

    document.addEventListener('click', Check);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route element={<LayoutWrite />}>
          <Route
            path='/raidboard/write'
            element={<RaidWrite />}
          ></Route>
        </Route>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Home />}
          />
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

          <Route
            path='/raidboard/list'
            element={<RaidBoard />}
          ></Route>

          <Route
            path='*'
            element={<ErrorPage />}
          ></Route>
        </Route>
        <Route
          path='/test'
          element={<ArrayTest />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
