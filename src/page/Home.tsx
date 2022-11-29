import { useAppSelector } from '../store/store';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3rem;
`;

const Home = () => {
  const nickname = useAppSelector((state) => state.user.nickname);

  return (
    <>
      <div>
        <Title as={'h3'}>홈 {nickname}</Title>
      </div>
    </>
  );
};

export default Home;
