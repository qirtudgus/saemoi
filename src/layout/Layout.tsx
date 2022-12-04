import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
// import 로고 from '../img/saemoiSVG2.svg';
import 로고 from '../img/logo_s.svg';
// import 로고 from '../img/logo_w.svg';
import 햄버거메뉴 from '../img/menu_black.svg';
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/store';
import { logout, UserService } from '../store/userSlice';
import { BasicButton, SolidButton } from '../components/BtnGroup';
import { UserCount, UserCountMobile } from '../App';

const menuList2 = [
  // { name: '홈', link: '/' },
  // { name: '의류', link: '/clother' },
  // { name: '화장품', link: '/cosmetic' },
  // { name: '식품', link: '/food' },
  { name: '레이드 게시판', link: '/raidboard/list' },
  { name: '레이드 작성', link: '/raidboard/write' },
  { name: '자유 게시판', link: '/board/list' },
];

const HeaderWrap = styled.header`
  position: sticky;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background: #35363a;
  z-index: 100;
  border-bottom: 1px solid #e5e7eb;
  box-sizing: border-box;
  ${({ theme }) => theme.common.flexCenter};
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
    width: 100px;
    & img {
      max-width: 100px;
    }
  }
`;

const FooterWrap = styled.footer`
  width: 100%;
  height: 200px;
  margin-top: 50px;
  background: #575757;
  /* background: #e4e4fc; */
  border-top: 1px solid #e5e7eb;

  /* @media ${({ theme }) => theme.device.mobile} {
    height: 150px;
    margin-top: 25px;
  } */
`;

const FooterContent = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  width: 95%;
  max-width: 1280px;
  word-break: keep-all;
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
    color: #fff;
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

const MenuBtn = styled.div`
  width: 50px;
  height: 100%;
  display: none;

  & img {
    width: 45px;
    filter: invert(49%) sepia(20%) saturate(7074%) hue-rotate(340deg) brightness(96%) contrast(95%);

    /* filter: invert(65%) sepia(14%) saturate(1866%) hue-rotate(74deg) brightness(91%) contrast(90%); */
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 40px;
    & img {
      width: 35px;
    }
    ${({ theme }) => theme.common.flexCenter};
  }
`;

interface SlideInterface {
  visible?: boolean;
  ref: any;
  isLogin: boolean;
}

const SlideWrap = styled.div<SlideInterface>`
  height: 0px;
  z-index: 10000;
  width: 100%;
  ${({ theme }) => theme.common.flexCenterColumn};
  background-color: #575757;
  position: fixed;
  top: 60px;
  &.active {
    transition: height 0.4s;
    height: calc(${menuList2.length * 50}px + ${(props) => (props.isLogin ? 50 : 100)}px);
    box-shadow: 1px 1px 11px -2px rgb(0 0 0 / 30%);
  }
  transition: height 0.15s;
  overflow: hidden;
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

const SlideUl = styled.ul`
  position: relative;
  width: 95%;
  z-index: 20;
`;
const SlideLi = styled.li`
  ${({ theme }) => theme.common.flexCenterColumn};
  align-items: flex-start;
  height: 50px;
  position: relative;
  z-index: 20;
  width: 100%;
  cursor: pointer;
  & > a:visited {
    color: #fff;
  }
  & > a {
    width: 100%;
    display: inline-block;
  }
`;

const UserCountandMenu = styled.div`
  display: flex;
  align-items: center;
`;

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menu = useRef() as React.RefObject<HTMLDivElement>;
  const { isLogin } = useAppSelector((state) => state.user);
  // const userCount = useAppSelector((state) => state.userList.length);
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
            <UserCountandMenu>
              <UserCountMobile />
              <MenuBtn
                onClick={() => {
                  if (menu != null) {
                    menu.current!.classList.toggle('active');
                  } else {
                    return;
                  }
                }}
              >
                <img
                  src={햄버거메뉴}
                  alt='메뉴'
                ></img>
              </MenuBtn>
            </UserCountandMenu>
            {isLogin ? (
              <LoginBtnWrap>
                <UserCount />
                <BasicButton
                  OnClick={() => {
                    console.log('로그아웃 시도');

                    dispatch(UserService.logoutUser());
                  }}
                >
                  로그아웃
                </BasicButton>
              </LoginBtnWrap>
            ) : (
              <LoginBtnWrap>
                <UserCount />
                <SolidButton
                  ClassName={'ml_10 mr_10'}
                  OnClick={() => {
                    navigate('/login');
                  }}
                >
                  로그인
                </SolidButton>
                <BasicButton
                  ClassName={'ml_10'}
                  OnClick={() => {
                    navigate('/register');
                  }}
                >
                  회원가입
                </BasicButton>
              </LoginBtnWrap>
            )}
          </HeaderDiv>
        </HeaderWrap>
        <SlideWrap
          isLogin={isLogin}
          ref={menu}
        >
          <SlideUl>
            {menuList2.map((i, index) => {
              return (
                <SlideLi key={index}>
                  <NavLink
                    onClick={(e) => {
                      menu.current!.classList.toggle('active');
                    }}
                    to={`${i.link}`}
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                  >
                    {i.name}
                  </NavLink>
                </SlideLi>
              );
            })}
            {isLogin ? (
              <SlideLi
                onClick={() => {
                  console.log('로그아웃 시도');
                  dispatch(logout());
                }}
              >
                로그아웃
              </SlideLi>
            ) : (
              <>
                <SlideLi
                  onClick={() => {
                    menu.current!.classList.toggle('active');
                    navigate('/login');
                  }}
                >
                  로그인
                </SlideLi>
                <SlideLi
                  onClick={() => {
                    menu.current!.classList.toggle('active');
                    navigate('/register');
                  }}
                >
                  회원가입
                </SlideLi>
              </>
            )}
          </SlideUl>
        </SlideWrap>
        <MainWrap>
          <Outlet />
        </MainWrap>
        <FooterWrap>
          <FooterContent>포켓몬스터 스칼렛/바이올렛 테라레이드 배틀 모집을 위한 사이트입니다.</FooterContent>
        </FooterWrap>
      </ThemeProvider>
    </div>
  );
};

export default React.memo(Layout);
