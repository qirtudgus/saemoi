import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import customAxios from '../util/customAxios';

let fetchRaidList = async () => {
  console.log('fetchRaidList api 실행');
  let { data } = await customAxios('get', '/raidboard/list', {});
  return data;
};

let addRaidList = async () => {
  const res = await customAxios('post', '/raidboard/list', {
    nickname: '리액트 쿼리',
    raidCode: 'QUERYT',
    monsterName: '쿼리몬스터',
    type: '',
    // type: typeRef.current.value,
    positionState: '어태커',
    difficultyState: '6쿼',
    optionList: ['하하하', '리쿼'],
    etcText: '리액트 쿼리 테스트 포스트입니다.',
    date: '2022/12/06 03:40:22',
  });
  return res;
};

let fetchRaidList2 = async () => {
  console.log('fetchRaidList2 api 실행');
  let { data } = await customAxios('get', '/raidboard/list', {});
  return data;
};

const List = () => {
  const queryClient = useQueryClient();
  const prevFetch = useQuery(['fetchRaidList'], fetchRaidList, {
    staleTime: 10000,
    cacheTime: 5000,
    enabled: true, // mount 시에 자동으로 쿼리함수를 실행할지에 대한 여부, false면 mount돼도 쿼리는 실행되지않음(쿼리값으로 렌더링 시 오류가 남)
    // refetchInterval: 2000, // 일정 시간마다 fetch를 실행
    // refetchIntervalInBackground: true, // 백그라운드 상태에서도 실행
    refetchOnMount: false, // 쿼리가 stale일때 mount마다 refetch를 실행할지 여부.
    refetchOnWindowFocus: false, // 쿼리가 stale일때 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: (data) => {
      // 성공시 호출
      console.log(data);
    },
    onError: (e) => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e);
    },
    // select(data) {
    //   console.log('들어온 데이터를 select가 미들웨어같은 역할을 해줌');
    //   console.log(data);
    //   return data;
    // },
  });

  const addRaidLists = useMutation(['addRaidList'], addRaidList, {
    onSuccess: () => {
      console.log('뮤테이션 성공');
      // postTodo가 성공하면 todos로 맵핑된 useQuery api 함수를 실행합니다.
      queryClient.invalidateQueries(['fetchRaidList']);
    },
    onError: (err) => {
      // 요청 실패시 실행
      console.log(err);
      console.log('글을 저장하지 못했습니다.');
    },
    onSettled: () => {
      console.log('요청이 실행되었습니다.'); // 성공실패 관계없이 실행
    },
  });

  if (prevFetch.isLoading) {
    return <span>Loading...</span>;
  }

  if (prevFetch.isError) {
    return <span>Error</span>;
  }

  return (
    <>
      <button
        onClick={() => {
          addRaidLists.mutate();
        }}
      >
        뮤테이션
      </button>
      <ul>
        {prevFetch.data.map((todo: any) => (
          <li key={todo.idx}>
            {todo.idx} {todo.raidCode}
          </li>
        ))}
      </ul>
    </>
  );
};

export default React.memo(List);
