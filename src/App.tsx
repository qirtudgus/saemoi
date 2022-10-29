import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Layout from './layout/Layout';
import GlobalStyles from './layout/GlobalStyles';

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
