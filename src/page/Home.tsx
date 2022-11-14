import { useAppSelector } from '../store/store';
import customAxios from '../util/customAxios';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3rem;
`;

const Home = () => {
  const nickname = useAppSelector((state) => state.user.nickname);

  return (
    <div>
      <Title as={'h3'}>당신의 닉네임 {nickname}</Title>
      <button
        onClick={() => {
          customAxios('post', '/test', { test: '프론트에서 보내는 테스트값' }).then((res) => {
            console.log(res.data);
          });
        }}
      >
        api 테스트
      </button>
    </div>
  );
};

export default Home;
