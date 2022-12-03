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
const port = process.env.REACT_APP_IO_SERVER_API as string;
const socket = io(port);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //소켓 이벤트마다 현재 접속자를 가져와준다..
    socket.on('users.count', function (payload) {
      console.log('소켓 온!!');
      console.log(payload);
      dispatch(connectedUser(payload));
    });
  }, []);

  return (
    <>
      {/* 
      <p>현재 접속자 : {list.length}</p>
      {list.map((i: any) => {
        return <li key={i.id}>{i.id}</li>;
      })} */}
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
