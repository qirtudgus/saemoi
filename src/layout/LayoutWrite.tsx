import { Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';

import React from 'react';

const MainWrap = styled.main`
  min-height: calc(100vh - 310px);
  width: 95%;
  max-width: 1280px;
  margin: 0 auto;
`;

const LayoutWrite = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <MainWrap>
          <Outlet />
        </MainWrap>
      </ThemeProvider>
    </div>
  );
};

export default React.memo(LayoutWrite);
