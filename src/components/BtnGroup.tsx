import styled, { css, keyframes } from 'styled-components';
import theme from '../layout/theme';
import { ThemeProvider } from 'styled-components';

interface ButtonInterface {
  ButtonBG?: string;
  ButtonTextColor?: string;
}

const ButtonWrap = styled.button<ButtonInterface>`
  cursor: pointer;
  width: 100px;
  height: 40px;
  padding: 5px;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => (props.ButtonBG ? props.ButtonBG : '#eee')};
  color: ${(props) => (props.ButtonTextColor ? props.ButtonTextColor : '#000')};
  &:hover {
    opacity: 0.8;
  }
  &.ml_10 {
    margin-left: 10px;
  }
  &.mr_10 {
    margin-right: 10px;
  }
  &.mt_10 {
    margin-top: 10px;
  }
  &.mb_10 {
    margin-bottom: 10px;
  }
`;

// type ButtonClassNameType = 'mr_10' | 'ml_10' | 'mt_10' | 'mb_10';

interface ButtonPropsInterface {
  text: string;
  ClassName?: string;
  OnClick: () => void;
}

export const BasicButton = ({ text, ClassName, OnClick }: ButtonPropsInterface): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ButtonWrap
        className={ClassName}
        onClick={OnClick}
      >
        {text}
      </ButtonWrap>
    </ThemeProvider>
  );
};

export const SolidButton = ({ text, ClassName, OnClick }: ButtonPropsInterface): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ButtonWrap
        className={ClassName}
        onClick={OnClick}
        ButtonBG={theme.colors.main}
        ButtonTextColor='#fff'
      >
        {text}
      </ButtonWrap>
    </ThemeProvider>
  );
};
