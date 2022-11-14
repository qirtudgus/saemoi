import React from 'react';
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

function App() {
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
          />
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
            path='*'
            element={<ErrorPage />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
