import { useRef, useEffect, useState } from 'react';
import { returnDeleteTime } from '../util/returnTodayString';

export function useInterval(callback: any, delay: number) {
  const savedCallback = useRef() as React.MutableRefObject<any>;

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
//타이머 구현
// https://class.codejong.kr/t/react/371/3
export const CountDownView = ({ targetISOString }: any) => {
  console.log('렌더링');
  //   console.log((+new Date(targetISOString) - +new Date()) / 1000);

  returnDeleteTime(targetISOString);

  const remain = useIntervalValue(() => returnDeleteTime(targetISOString), 1000);
  return <div>{remain}초 뒤 삭제</div>;
};

const useIntervalValue = (calculator: any, delay: any) => {
  const [result, setResult] = useState(calculator());
  useInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
  }, delay);

  return result;
};
