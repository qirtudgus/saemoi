import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { UserService } from '../store/userSlice';
import TitleText from './TitleText';

const RegisterWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputDiv = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const InputTitle = styled.h1`
  font-size: 1em;
  margin-bottom: 6px;
  width: 100%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

const InputWarning = styled.span`
  font-size: 1em;
  margin-left: 10px;
  color: red;
  @media ${({ theme }) => theme.device.tablet} {
    display: block;
    margin-top: 5px;
    margin-left: 0px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid#dadde6;
  border-radius: 5px;
  &:focus {
    background-color: #dfe3ff;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 300px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

const Button = styled.button`
  width: 400px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.main};
  font-size: 1.2em;
  @media ${({ theme }) => theme.device.tablet} {
    width: 300px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const idRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const [idWarning, setIdWarning] = useState('');
  const [pwWarning, setPwWarning] = useState('');

  const login = () => {
    let id = idRef.current.value;
    let pw = passwordRef.current.value;
    console.log(id);
    dispatch(UserService.getUser({ id, pw })).then((res) => {
      console.log(res.payload);
      console.log(res.payload.errorcode);
      if (res.payload.errorcode === 100) {
        setIdWarning(res.payload.error);
      }
      if (res.payload.errorcode === 101) {
        setIdWarning('');
        setPwWarning(res.payload.error);
      }
      if (res.payload.errorcode === undefined) {
        navigate('/');
      }
    });
  };

  console.log(isLogin);

  useEffect(() => {
    if (isLogin === true) {
      alert('이미 로그인중입니다.');
      navigate('/');
    }
  }, []);

  return (
    <RegisterWrap>
      <TitleText text='로그인'></TitleText>
      <InputDiv>
        <InputTitle>
          아이디 <InputWarning>{idWarning}</InputWarning>
        </InputTitle>
        <Input
          ref={idRef}
          // onChange={(e: React.FormEvent<HTMLInputElement>): void => inputChange(e, setId)}
        ></Input>
      </InputDiv>
      <InputDiv>
        <InputTitle>
          비밀번호 <InputWarning>{pwWarning}</InputWarning>
        </InputTitle>
        <Input
          type={'password'}
          ref={passwordRef}
          // onChange={(e: React.FormEvent<HTMLInputElement>): void => inputChange(e, setPassword)}
        ></Input>
      </InputDiv>
      <Button onClick={login}>로그인</Button>
    </RegisterWrap>
  );
};
export default Login;
