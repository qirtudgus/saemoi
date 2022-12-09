import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import React from 'react';

const MainWrap = styled.main`
  min-height: calc(100vh - 310px);
  width: 95%;
  max-width: 1280px;
  margin: 0 auto;
`;

const LayoutWrite = () => {
  return (
    <>
      <MainWrap>
        <Outlet />
      </MainWrap>
    </>
  );
};

export default React.memo(LayoutWrite);
