import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../layout/theme';

const Title = styled.h1`
  font-size: 2em;
  padding: 15px 0;
  display: block;
  margin: 0 auto;
  font-weight: bold;
  word-break: keep-all;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8em;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.6em;
  }
`;

const TitleText = ({ text }: { text: string }) => {
  return (
    <ThemeProvider theme={theme}>
      <Title>{text}</Title>
    </ThemeProvider>
  );
};
export default React.memo(TitleText);
