import React, { useState } from 'react';
import styled from 'styled-components';
import ArrayTestObj from './ArrayTestObj';

interface ArrDiv {}

const Div = styled.div`
  width: 100%;
  height: 40px;
  background: green;
`;

var id = 0;

const ArrayTest = () => {
  const [arr, setArr] = useState([{ id: id, test: '테스트 박스' }]);
  const [arr2, setArr2] = useState([{ id: id, test: '테스트 박스' }]);

  let AddArr = () => {
    //   let a = arr.concat({ test: '테스트 박스입니다' });
    id = id += 1;
    setArr([...arr, { id: id, test: '테스트 박스입니다' }]);
  };

  let AddArr2 = () => {
    //   let a = arr.concat({ test: '테스트 박스입니다' });
    id = id += 1;
    setArr2([...arr2, { id: id, test: '테스트 박스입니다' }]);
  };

  return (
    <>
      <button onClick={AddArr}>1번 오브젝트 박스 추가</button>
      <button onClick={AddArr2}>2번 오브젝트 박스 추가</button>
      {/* <button onClick={)}>박스 추가</button> */}

      {arr2.map((i, index) => {
        return (
          <ArrayTestObj
            key={i.id}
            index={index}
            i={i}
          />
          //   <Div>
          //     {index}
          //     {i.test}
          //   </Div>
        );
      })}

      {arr.map((i, index) => {
        return (
          <ArrayTestObj
            key={i.id}
            index={index}
            i={i}
          />
          //   <Div>
          //     {index}
          //     {i.test}
          //   </Div>
        );
      })}
    </>
  );
};

export default React.memo(ArrayTest);
