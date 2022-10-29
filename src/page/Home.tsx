import customAxios from '../util/customAxios';
import styled from 'styled-components';

const Home = () => {
  return (
    <div>
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
