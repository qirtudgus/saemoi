import { useAppSelector, useAppDispatch } from '../store/store';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3rem;
`;

const Home = () => {
  const nickname = useAppSelector((state) => state.user.nickname);
  const list = useAppSelector((state) => state.userList);

  return (
    <>
      <p>현재 접속자 : {list.length}</p>
      {list.map((i: any) => {
        return <li key={i.id}>{i.id}</li>;
      })}
      <div>
        <Title as={'h3'}>홈 {nickname}</Title>
      </div>
    </>
  );
};

export default Home;
