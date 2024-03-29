import styled from 'styled-components';
import TitleText from '../components/TitleText';
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 310px);
  width: 100%;
  word-break: keep-all;
  text-align: center;
  @media ${({ theme }) => theme.device.tablet} {
    line-height: 3rem;
  }
`;

const ErrorPage = () => {
  return (
    <Wrap>
      <TitleText text='권한이 없거나 존재하지 않는 페이지입니다.'></TitleText>
    </Wrap>
  );
};

export default ErrorPage;
