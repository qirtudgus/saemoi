import styled, { ThemeProvider } from 'styled-components';
import theme from '../layout/theme';

const Title = styled.h1`
  font-size: 2.5em;
  padding: 30px 0;
  font-weight: bold;
  word-break: keep-all;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 2.3em;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2em;
  }
`;

const TitleText = ({ text }: { text: string }) => {
  return (
    <ThemeProvider theme={theme}>
      <Title>{text}</Title>
    </ThemeProvider>
  );
};
export default TitleText;
