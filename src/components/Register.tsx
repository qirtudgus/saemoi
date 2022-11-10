import { MutableRefObject, ReactElement, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../layout/theme';
import customAxios from '../util/customAxios';
import { errorCode } from '../util/errorCode';

const RegisterWrap = styled.div`
  width: 100%;
  margin-top: 10%;
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
    margin-top: 10px;
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
  border: 1px solid#aaa;
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

const Register = () => {
  const navigate = useNavigate();

  const idRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nicknameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [idWarning, setIdWarning] = useState('');
  const [nickWarning, setNickWarning] = useState('');
  const [pwWarning, setPwWarning] = useState('');
  const [cpwWarning, setCpwWarning] = useState('');

  const inputChange = (e: any, setFunc: React.Dispatch<React.SetStateAction<string>>) => {
    setFunc(e.currentTarget.value);
  };

  const join = () => {
    let end = false;
    let id = idRef.current.value;
    let nick = nicknameRef.current.value;
    let pw = passwordRef.current.value;
    let cpw = confirmPasswordRef.current.value;
    console.log(nick);
    //아이디
    if (id === '' || spaceCheck.test(id) || special_pattern.test(id) || !idCheckRegex.test(id)) {
      setIdWarning('2~10자 영문,숫자만 사용 가능합니다.');
      idRef.current.focus();
      return;
    } else {
      setIdWarning('');
    }
    //닉네임
    if (nick === '' || spaceCheck.test(nick) || (nick.length > 1 && nick.length > 10)) {
      setNickWarning('1~10자 공백없이 입력해주세요.');
      nicknameRef.current.focus();
      return;
    } else {
      setNickWarning('');
    }
    //비밀번호
    if (pw === '' || spaceCheck.test(pw) || !passwordRegex.test(pw)) {
      setPwWarning('5~20자의 영문,숫자,특수문자만 사용하세요.');
      passwordRef.current.focus();
      return;
    } else {
      setPwWarning('');
    }
    //비밀번호 확인
    if (pw !== cpw) {
      setCpwWarning('작성한 비밀번호와 다릅니다.');
      confirmPasswordRef.current.focus();
      return;
    } else {
      setCpwWarning('');
      end = true;
    }
    if (end) {
      customAxios('post', '/register/join', { id, nick, pw }).then((res) => {
        let code: number = res.data.errorCode;
        if (res.data.errorCode === 1) {
          setIdWarning(errorCode[code]);
          idRef.current.focus();
        }
        if (res.data.errorCode === 2) {
          setNickWarning(errorCode[code]);
          nicknameRef.current.focus();
        }
        if (res.data.errorCode === 0) {
          alert('회원가입 완료!');
          navigate('/');
        }
      });
    }
  };

  //아이디 양식
  const idCheckRegex = /^[a-zA-Z0-9]{2,10}$/;

  //특수문자 체크
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/i;

  //비밀번호 양식
  const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;
  //공백체크 표현식
  const spaceCheck = /\s/;

  return (
    <ThemeProvider theme={theme}>
      <RegisterWrap>
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
            닉네임 <InputWarning>{nickWarning}</InputWarning>
          </InputTitle>
          <Input
            ref={nicknameRef}
            // onChange={(e: React.FormEvent<HTMLInputElement>): void => inputChange(e, setNickname)}
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
        <InputDiv>
          <InputTitle>
            비밀번호 확인 <InputWarning>{cpwWarning}</InputWarning>
          </InputTitle>
          <Input
            type={'password'}
            ref={confirmPasswordRef}
            // onChange={(e: React.FormEvent<HTMLInputElement>): void => inputChange(e, setConfirmPassword)}
          ></Input>
        </InputDiv>
        <Button onClick={join}>가입</Button>
      </RegisterWrap>
    </ThemeProvider>
  );
};
export default Register;
