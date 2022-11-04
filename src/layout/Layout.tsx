import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import 로고 from '../img/saemoiSVG2.svg';
import 햄버거메뉴 from '../img/menu_black.svg';
import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderWrap = styled.header`
  position: sticky;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 100;
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
  justify-content: space-between;

  @media ${({ theme }) => theme.device.tablet} {
    padding: 0px 10px;
  }
`;

const HeaderLogo = styled.div`
  width: 150px;
  cursor: pointer;
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
  margin-top: 50px;
  background: #e4e4fc;
  border-top: 1px solid #e5e7eb;
`;

const MainWrap = styled.main`
  min-height: calc(100vh - 310px);
  width: 95%;
  max-width: 1280px;
  margin: 0 auto;
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
  & > a:visited {
    color: #000;
  }
  & > a.active {
    color: ${({ theme }) => theme.colors.main};
  }
  & > a:hover {
    color: ${({ theme }) => theme.colors.main};
    font-weight: bold;
  }
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
  justify-content: flex-end;
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

const menuList2 = [
  { name: '의류', link: '/clother' },
  { name: '화장품', link: '/cosmetic' },
  { name: '식품', link: '/food' },
];

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <HeaderWrap>
          <HeaderDiv>
            <HeaderLogo
              onClick={() => {
                navigate('/');
              }}
            >
              <img
                src={로고}
                alt='logo'
              ></img>
            </HeaderLogo>
            <HeaderUl>
              {menuList2.map((i, index) => (
                <HeaderLi key={index}>
                  <NavLink
                    to={`${i.link}`}
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                  >
                    {i.name}
                  </NavLink>
                </HeaderLi>
              ))}
            </HeaderUl>
            <MenuBtn>
              <img
                src={햄버거메뉴}
                alt='메뉴'
              ></img>
            </MenuBtn>
            <LoginBtnWrap>
              <LoginBtn
                onClick={() => {
                  navigate('/login');
                }}
              >
                로그인
              </LoginBtn>
              <RegisterBtn
                onClick={() => {
                  navigate('/register');
                }}
              >
                회원가입
              </RegisterBtn>
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
