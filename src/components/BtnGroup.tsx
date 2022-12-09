import { motion } from 'framer-motion';
import styled from 'styled-components';
import theme from '../layout/theme';

interface ButtonInterface {
  $ButtonBG?: string;
  $ButtonTextColor?: string;
}

const ButtonWrap = styled(motion.button)<ButtonInterface>`
  cursor: pointer;
  width: 100px;
  height: 40px;
  padding: 5px;
  border-radius: 10px;
  font-weight: bold;
  background-color: ${(props) => (props.$ButtonBG ? props.$ButtonBG : '#eee')};
  color: ${(props) => (props.$ButtonTextColor ? props.$ButtonTextColor : '#000')};
  display: flex;
  justify-content: center;
  align-items: center;
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
  & img {
    max-width: 20px;
    margin: 2px;
  }
`;

// type ButtonClassNameType = 'mr_10' | 'ml_10' | 'mt_10' | 'mb_10';

interface ButtonPropsInterface {
  text?: string;
  ClassName?: string;
  OnClick: () => void;
  children?: any;
}

export const BasicButton = ({ text, ClassName, OnClick, children }: ButtonPropsInterface): JSX.Element => {
  return (
    <ButtonWrap
      whileTap={{ scale: 0.95 }}
      className={ClassName}
      onClick={OnClick}
    >
      {children}
    </ButtonWrap>
  );
};

export const SolidButton = ({ text, ClassName, OnClick, children }: ButtonPropsInterface): JSX.Element => {
  return (
    <ButtonWrap
      whileTap={{ scale: 0.95 }}
      className={ClassName}
      onClick={OnClick}
      $ButtonBG={theme.colors.main}
      $ButtonTextColor='#fff'
    >
      {children}
    </ButtonWrap>
  );
};
