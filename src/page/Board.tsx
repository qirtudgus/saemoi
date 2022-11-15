import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TitleText from '../components/TitleText';
import customAxios from '../util/customAxios';

const BoardWrap = styled.div`
  width: 100%;

  height: calc(100vh - 310px);
`;

const BoardLi = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  justify-content: space-around;

  &:hover {
    background-color: #eee;
  }
  &:hover .title {
    font-weight: bold;
  }

  & .title {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & .date {
    width: 100px;
  }
  & .comment {
    width: 100px;
  }
`;
const WriteButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & button {
    cursor: pointer;
  }
`;

const Board = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([
    {
      index: '',
      title: '',
      nickname: '',
      date: '',
      commentCount: '',
      view: '',
      likes: '',
    },
  ]);

  useEffect(() => {
    customAxios('get', '/board', {}).then((res) => {
      console.log(res.data);
      setList(res.data);
    });
  }, []);

  return (
    <BoardWrap>
      <TitleText text='게시판'></TitleText>

      {list.map((i) => {
        return (
          <React.Fragment key={i.index}>
            <BoardLi
              onClick={() => {
                //여기서 디스패치해서 제목과 콘텐츠를 가져와야할듯?
                //해당 페이지에서 새로고침 시 값을 가져오질못함..해당컴포넌트에서 useEffect를 이용해야 새로고침에도 데이터 획득가능
                // dispatch(BoardViewService.getBoard({ number: i.index }))
                customAxios('put', `/board/view?number=${i.index}`);
                navigate(`/board/posts/${i.index}`);
              }}
            >
              <h1>{i.index}</h1>
              <span className='title'>{i.title}</span>
              <span>{i.nickname}</span>
              <span className='date'>{i.date.slice(0, 10)}</span>
              <p className='comment'>
                댓글 <span>{i.commentCount}</span>
              </p>
              {/* <p>
                조회수<span>{i.view}</span>
              </p> */}
              <p>
                좋아요<span>{i.likes}</span>
              </p>
            </BoardLi>
          </React.Fragment>
        );
      })}
      <WriteButton>
        <button
          onClick={() => {
            navigate('/board/write');
          }}
        >
          작성하기
        </button>
      </WriteButton>
    </BoardWrap>
  );
};

export default Board;
