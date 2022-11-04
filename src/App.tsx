import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Layout from './layout/Layout';
import GlobalStyles from './layout/GlobalStyles';
import Clother from './layout/Clother';
import Cosmetic from './layout/Cosmetic';
import Food from './layout/Food';
import Login from './components/Login';
import Register from './components/Register';

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
