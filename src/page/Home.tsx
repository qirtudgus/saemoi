import { useAppSelector } from '../store/store';
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
