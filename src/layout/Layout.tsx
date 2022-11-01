import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import 로고 from '../img/saemoiSVG2.svg';
import 햄버거메뉴 from '../img/menu_black.svg';

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
  max-width: 1260px;
  padding: 0px 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLogo = styled.div`
  width: 150px;
  & img {
    width: auto;
  }
  @media ${({ theme }) => theme.device.tablet} {
    & img {
      width: auto;
      max-width: 100px;
    }
  }
`;

const FooterWrap = styled.footer`
  width: 100%;
  height: 200px;
  background: #e4e4fc;
  border-top: 1px solid #e5e7eb;
`;

const MainWrap = styled.main`
  min-height: calc(100vh - 260px);
`;

const HeaderUl = styled.ul`
  width: 70%;
  ${({ theme }) => theme.common.flexCenter};
  justify-content: flex-start;
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;
const HeaderLi = styled.li`
  cursor: pointer;
  width: auto;
  margin: 0px 20px;
  &:nth-child(1) {
    margin-left: 50px;
  }
`;

const LoginBtnWrap = styled.div`
  width: 300px;
  height: 100%;
  position: relative;
  ${({ theme }) => theme.common.flexCenter};
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const LoginBtn = styled.div`
  width: 90px;
  height: 35px;
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.main};
  ${({ theme }) => theme.common.flexCenter};
  color: #fff;
  margin-right: 30px;
`;
const RegisterBtn = styled.div`
  width: 90px;
  height: 35px;
  border-radius: 40px;
  border: 2px solid ${({ theme }) => theme.colors.main};
  ${({ theme }) => theme.common.flexCenter};
  color: ${({ theme }) => theme.colors.main};
`;

const MenuBtn = styled.div`
  width: 50px;
  height: 100%;
  display: none;
  & img {
    width: 45px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 40px;
    & img {
      width: 35px;
    }
    ${({ theme }) => theme.common.flexCenter};
  }
`;

const menuList = ['메뉴', '메뉴23', '메뉴42432', '메뉴4243212'];

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
            <HeaderUl>
              {menuList.map((i) => (
                <HeaderLi key={i}>{i}</HeaderLi>
              ))}
            </HeaderUl>
            <MenuBtn>
              <img
                src={햄버거메뉴}
                alt='메뉴'
              ></img>
            </MenuBtn>
            <LoginBtnWrap>
              <LoginBtn>로그인</LoginBtn>
              <RegisterBtn>회원가입</RegisterBtn>
            </LoginBtnWrap>
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
