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

interface ButtonPropsInterface {
  ClassName?: string;
  OnClick: () => void;
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

export const BasicButton = ({ ClassName, OnClick, children }: ButtonPropsInterface): JSX.Element => {
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

export const SolidButton = ({ ClassName, OnClick, children }: ButtonPropsInterface): JSX.Element => {
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
