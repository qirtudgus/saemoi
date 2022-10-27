import React, { useState } from 'react';
import GlobalStyles from './layout/GlobalStyles';
import customAxios from './util/customAxios';
function App() {
  const [test, setTest] = useState('');

  return (
    <>
      <GlobalStyles />
      <button
        onClick={() => {
          customAxios('post', '/test', { test: '프론트에서 보내는 테스트값' }).then((res) => {
            console.log(res.data);
            setTest(res.data[0].name);
          });
        }}
      >
        zzz
      </button>
      <p>{test}</p>
      <p>자동배포가 되었느냐</p>
      <p>자동배포가 되었느냐2</p>
    </>
  );
}

export default App;
