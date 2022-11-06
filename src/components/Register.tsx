import { ReactElement, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../layout/theme';
import customAxios from '../util/customAxios';

const RegisterWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputDiv = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const InputTitle = styled.h1`
  font-size: 1em;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid#aaa;
  border-radius: 5px;

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
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const inputChange = (e: any, setFunc: React.Dispatch<React.SetStateAction<string>>) => {
    setFunc(e.currentTarget.value);
  };

  const join = () => {
    registerInfoCheck();

    customAxios('post', '/register/join', { id, nickname, password, confirmPassword }).then((res) =>
      console.log(res.data),
    );
  };

  //비밀번호 양식
  const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;
  //공백체크 표현식
  const spaceCheck = /\s/;

  const registerInfoCheck = () => {
    if (spaceCheck.test(password)) {
      alert('공백은 사용할 수 없습니다.');
      return;
    }
    if (!passwordRegex.test(password)) {
      alert('5~20자의 영문,숫자,특수문자만 사용하세요.');
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <RegisterWrap>
        <InputDiv>
          <InputTitle>아이디</InputTitle>
          <Input onChange={(e: React.FormEvent<HTMLInputElement>): void => inputChange(e, setId)}></Input>
        </InputDiv>
        <InputDiv>
          <InputTitle>닉네임</InputTitle>
          <Input onChange={(e: React.FormEvent<HTMLInputElement>): void => inputChange(e, setNickname)}></Input>
        </InputDiv>
        <InputDiv>
          <InputTitle>비밀번호</InputTitle>
          <Input onChange={(e: React.FormEvent<HTMLInputElement>): void => inputChange(e, setPassword)}></Input>
        </InputDiv>
        <InputDiv>
          <InputTitle>비밀번호 확인</InputTitle>
          <Input onChange={(e: React.FormEvent<HTMLInputElement>): void => inputChange(e, setConfirmPassword)}></Input>
        </InputDiv>
        <Button onClick={join}>가입!</Button>
      </RegisterWrap>
    </ThemeProvider>
  );
};
export default Register;
