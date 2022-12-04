import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Layout from './layout/Layout';
import GlobalStyles from './layout/GlobalStyles';
import Clother from './layout/Clother';
import Cosmetic from './layout/Cosmetic';
import Food from './layout/Food';
import Login from './components/Login';
import Register from './components/Register';
import Board from './page/Board';
import Write from './page/Write';
import View from './page/View';
import PostEdit from './page/PostEdit';
import ErrorPage from './page/ErrorPage';
import BoardSearchResult from './page/BoardSearchResult';
import RaidWrite from './page/RaidWrite';
import { useAppSelector, useAppDispatch } from './store/store';
import { io } from 'socket.io-client';
import { connectedUser } from './store/userListSlice';
import RaidBoard from './page/RaidBoard';
import styled, { css, ThemeProvider } from 'styled-components';
import theme from './layout/theme';
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

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  & > span {
    font-size: 1.2em;
    position: relative;
    top: -2px;
    color: #41cc41;
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

  display: none;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    /* height: 25px; */
  }

  & > span {
    font-size: 1.2em;
    position: relative;
    top: -2px;
    color: #41cc41;
    margin-right: 3px;
  }
`;

export const UserCount = () => {
  // const userCount = useAppSelector((state) => state.userList.length);
  const userCount2 = useAppSelector((state) => state.userCount);
  return (
    <ThemeProvider theme={theme}>
      <CountBox>
        <span>● </span>
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
        <span>●</span>
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

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/clother'
            element={<Clother />}
          />
          <Route
            path='/cosmetic'
            element={<Cosmetic />}
          />
          <Route
            path='/food'
            element={<Food />}
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
            path='/raidboard/write'
            element={<RaidWrite />}
          ></Route>
          <Route
            path='/raidboard/list'
            element={<RaidBoard />}
          ></Route>
          <Route
            path='*'
            element={<ErrorPage />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
