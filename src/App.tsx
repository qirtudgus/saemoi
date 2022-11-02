import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Layout from './layout/Layout';
import GlobalStyles from './layout/GlobalStyles';
import Clother from './layout/Clother';

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
