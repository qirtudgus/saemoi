import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RaidBoard from './RaidBoard';
import RealTimeRaidBoard from './RealTimeRaidBoard';

const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  background: #575757;
`;
const Button = styled.button`
  width: 200px;
  height: 100px;
`;
const Home = () => {
  const navigate = useNavigate();

  return (
    <Bg>
      <Button
        onClick={() => {
          navigate('/realtimeraidboard');
        }}
      >
        입장하기
      </Button>
    </Bg>
  );
};

export default Home;
