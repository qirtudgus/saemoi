import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled, { css, keyframes } from 'styled-components';

interface ListIn {
  $id?: number;
}

const Ani = keyframes`
  from{scale:0.5}
  to{scale:1}
`;

const Lists = styled(motion.li)<ListIn>`
  /* ${(props) =>
    props.$id &&
    css`
      &:first-child {
        animation: ${Ani} 1s;
        font-size: 2em;
      }
    `} */
`;

const List = React.memo(function ({ i, index, $id }: { i: any; index?: number; $id?: number }) {
  return (
    <Lists
      $id={id}
      // initial={{ x: '-300px', opacity: 0 }}
      // animate={{ x: 0, opacity: 1 }}

      animate={{ x: 100 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      {i.text}
    </Lists>
  );
});

var id = 0;
const ArrayTest = () => {
  const [arr, setArr] = useState<{ text: string }[]>([{ text: '테스트 박스' }]);
  let addArr = () => {
    id++;
    //앞쪽에 먼저 넣으면 기존 배열의 순서들이 전부 깨지니까 memo가 소용없고 전부 리렌더링 된다.
    setArr([{ text: `테스트 박스 ${id}` }, ...arr]);
  };

  let concatArr = () => {
    id++;
    setArr(arr.concat({ text: `테스트 박스 ${id}` }));
  };

  return (
    <>
      <button onClick={addArr}>스프레드 문법 추가</button>
      <button onClick={concatArr}>concat()추가</button>
      <ul>
        {arr.map((i, index) => {
          return (
            <List
              // $id={id}
              key={index}
              i={i}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ArrayTest;
