import { useAppSelector, useAppDispatch } from '../store/store';
import styled from 'styled-components';
import RaidBoard from './RaidBoard';

const Home = () => {
  const nickname = useAppSelector((state) => state.user.nickname);

  return (
    <>
      <RaidBoard />
    </>
  );
};

export default Home;
