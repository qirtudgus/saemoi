import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import 로고 from '../img/saemoiSVG2.svg';

const HeaderWrap = styled.header`
  position: sticky;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  box-sizing: border-box;
  ${({ theme }) => theme.common.flexCenter};
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;
const HeaderDiv = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.div`
  width: 150px;

  & img {
    width: auto;
  }
`;

const FooterWrap = styled.footer`
  width: 100%;
  height: 100px;
  background: #e4e4fc;
  border-top: 1px solid #e5e7eb;
`;

const MainWrap = styled.main`
  min-height: calc(100vh - 150px);
`;

const Layout = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <HeaderWrap>
          <HeaderDiv>
            <HeaderLogo>
              <img
                src={로고}
                alt='logo'
              ></img>
            </HeaderLogo>
          </HeaderDiv>
        </HeaderWrap>
        <MainWrap>
          <Outlet />
        </MainWrap>
        <FooterWrap></FooterWrap>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
