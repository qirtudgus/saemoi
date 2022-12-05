import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 40px;
  background: green;
`;

function TestObj({ i, index }: any) {
  console.log(`UserItem  component render`);

  return (
    <Div
      //   key={index}
      className='user-item'
    >
      <div>{i.id}</div>
      <div>이름: {i.test}</div>
    </Div>
  );
}

export default React.memo(TestObj);
