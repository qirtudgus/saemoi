import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardViewService } from '../store/boardSlice';
import { useAppDispatch } from '../store/store';
import customAxios from '../util/customAxios';

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [list, setList] = useState([
    {
      index: '',
      title: '',
    },
  ]);

  useEffect(() => {
    customAxios('get', '/board', {}).then((res) => {
      console.log(res.data);
      setList(res.data);
    });
  }, []);

  return (
    <>
      <h1>게시판</h1>
      <button
        onClick={() => {
          navigate('/write');
        }}
      >
        작성하기
      </button>
      {list.map((i) => {
        return (
          <React.Fragment key={i.index}>
            <li
              onClick={() => {
                //여기서 디스패치해서 제목과 콘텐츠를 가져와야할듯?
                dispatch(BoardViewService.getBoard({ number: i.index }));
                navigate(`/view/${i.index}`);
              }}
            >
              <h1>{i.index}</h1>
              <h1>{i.title}</h1>
            </li>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Board;
