import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import 로고 from '../img/saemoiSVG2.svg';
import 로고 from '../img/logo_s.svg';
// import 로고 from '../img/logo_w.svg';
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { UserCount, UserCountMobile } from '../App';
import { BasicButton, SolidButton } from '../components/BtnGroup';
import 햄버거메뉴 from '../img/menu_black.svg';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logout, UserService } from '../store/userSlice';

const menuList2 = [
  // { name: '홈', link: '/' },
  // { name: '의류', link: '/clother' },
  // { name: '화장품', link: '/cosmetic' },
  // { name: '식품', link: '/food' },
  { name: '레이드 리스트', link: '/realtimeraidboard' },
  { name: '레이드 등록', link: '/raidboard/write' },
  { name: '설정', link: '/config' },
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  box-sizing: border-box;
  ${({ theme }) => theme.common.flexCenter};
`;
const HeaderDiv = styled.div`
  max-width: 1280px;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media ${({ theme }) => theme.device.tablet} {
    padding: 0px 10px;
    justify-content: space-between;
  }
`;

const HeaderLogo = styled.div`
  width: 150px;
  cursor: pointer;
  & img {
    width: 150px;
    height: 38px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100px;

    & img {
      max-width: 100px;
      height: 27px;
    }
  }
`;

const FooterWrap = styled.footer`
  width: 100%;
  height: 200px;
  margin-top: 50px;
  background: #575757;
  /* background: #e4e4fc; */
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};

  /* @media ${({ theme }) => theme.device.mobile} {
    height: 150px;
    margin-top: 25px;
  } */
`;

const FooterContent = styled.div`
  margin: 0 auto;
  padding: 10px 0;
  width: 95%;
  max-width: 1280px;
  word-break: keep-all;
  color: #d3d3d3;
  line-height: 20px;
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
  cursor: pointer;
  width: 50px;
  height: 100%;
  display: none;

  & img {
    width: 45px;
    height: 450px;
    filter: invert(49%) sepia(20%) saturate(7074%) hue-rotate(340deg) brightness(96%) contrast(95%);

    /* filter: invert(65%) sepia(14%) saturate(1866%) hue-rotate(74deg) brightness(91%) contrast(90%); */
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 40px;
    & img {
      width: 35px;
      height: 35px;
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
    /*
    기존에 회원가입, 로그인 기능이 있을때의 height 값
    */
    height: calc(${menuList2.length * 50}px + ${(props) => (props.isLogin ? 50 : 100)}px);
    /* height: calc(${menuList2.length * 50}px); */

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
    <>
      <HeaderWrap>
        <HeaderDiv>
          <HeaderLogo
            onClick={() => {
              navigate('/realtimeraidboard');
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
                  className={({ isActive }) => (isActive ? 'active' : undefined) + ' menuOpenCheck'}
                >
                  {i.name}
                </NavLink>
              </HeaderLi>
            ))}
          </HeaderUl>
          <UserCountandMenu>
            <UserCountMobile />
            <MenuBtn
              className='menuOpenCheck'
              onClick={(e) => {
                if (menu != null) {
                  menu.current!.classList.toggle('active');
                } else {
                  return;
                }
              }}
            >
              <img
                className='menuOpenCheck'
                src={햄버거메뉴}
                alt='메뉴'
              ></img>
            </MenuBtn>
          </UserCountandMenu>
          {/* <LoginBtnWrap>
            <UserCount />
          </LoginBtnWrap> */}
          {/* 로그인 기능 추가 시 아래 주석 해제할 것*/}
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
        id={'OpenMenuCheck'}
        isLogin={isLogin}
        ref={menu}
      >
        <SlideUl>
          {menuList2.map((i, index) => {
            return (
              <SlideLi
                key={index}
                className='menuOpenCheck'
              >
                <NavLink
                  onClick={(e) => {
                    menu.current!.classList.toggle('active');
                  }}
                  to={`${i.link}`}
                  className={({ isActive }) => (isActive ? 'active' : undefined) + ' menuOpenCheck'}
                >
                  {i.name}
                </NavLink>
              </SlideLi>
            );
          })}
          {/* 로그인 기능 추가 시 아래 주석 해제할 것*/}
          {isLogin ? (
            <SlideLi
              className='menuOpenCheck'
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
                className='menuOpenCheck'
                onClick={() => {
                  menu.current!.classList.toggle('active');
                  navigate('/login');
                }}
              >
                로그인
              </SlideLi>
              <SlideLi
                className='menuOpenCheck'
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
        <FooterContent>
          Poraid
          <br />
          포켓몬스터 스칼렛/바이올렛 테라 레이드 배틀 파티원 모집을 위한 사이트입니다.
          <br />
          문의 및 건의 이메일 : poraid.official@gmail.com
          <br />ⓒ 2022 Poraid., INC. All rights reserved.
        </FooterContent>
      </FooterWrap>
    </>
  );
};

export default React.memo(Layout);
