import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BoardList from '../components/BoardList';
import { SolidButton } from '../components/BtnGroup';
import TitleText from '../components/TitleText';
import edit_document_white_24dp from '../img/edit_document_white_24dp.svg';
import 돋보기 from '../img/돋보기.svg';
import { useAppSelector } from '../store/store';
import customAxios from '../util/customAxios';
import { Title } from './Board';

const BoardWrap = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 310px);
  /* height: calc(100vh - 310px); */
`;

const WriteSearchWrap = styled.div`
  display: flex;
  & button {
    flex-shrink: 0;
  }
`;

const WriteButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid#dadde6;
  & h1 {
    flex-shrink: 0;
  }
`;

const SearchInputWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 3px 3px 8px;
  border: 1px solid#dadde6;
  border-radius: 10px;
  height: 40px;
  margin-left: 10px;
  & input {
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0 0 2px 3px;
    width: 100%;
  }
  & input:focus-visible {
    outline: 0px;
  }
`;

const BoardSearchResult = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef() as RefObject<HTMLInputElement>;
  const isLogin = useAppSelector((state) => state.user.isLogin);

  interface BoardListInterface {
    index: string;
    title: string;
    nickname: string;
    date: string;
    commentCount: string;
    view: string;
    likes: string;
  }

  // const [list, setList] = useState([
  //   {
  //     index: '',
  //     title: '',
  //     nickname: '',
  //     date: '',
  //     commentCount: '',
  //     view: '',
  //     likes: '',
  //   },
  // ]);

  const [list, setList] = useState<null | BoardListInterface[]>(null);
  const { keyword } = useParams();

  useEffect(() => {
    searchInputRef.current!.value = keyword as string;
    customAxios('get', `/board/search?keyword=${keyword}`).then((res) => {
      console.log(res.data);
      if (res.data.length === 0) {
        setList([
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
      } else {
        setList(res.data);
      }
    });
  }, [keyword]);

  const searchBoardFunc = () => {
    console.log(searchInputRef.current!.value);
    const keyword = searchInputRef.current!.value;
    if (keyword.length < 2) {
      alert('검색어를 두 글자 이상입력해주세요!');
    } else {
      navigate(`/board/list/search/${keyword}`);
    }
  };

  return (
    <BoardWrap>
      <WriteButton>
        <Title>게시판</Title>
        <WriteSearchWrap>
          <SearchInputWrap>
            <img
              src={돋보기}
              alt='검색'
            />
            <input
              ref={searchInputRef}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.keyCode === 13) {
                  searchBoardFunc();
                } else {
                  return;
                }
              }}
            ></input>
            {/* <BasicButton OnClick={searchBoardFunc}>검색</BasicButton> */}
          </SearchInputWrap>
          <SolidButton
            ClassName='ml_10'
            OnClick={() => {
              if (isLogin) {
                navigate('/board/write');
              } else {
                alert('로그인 후 이용 가능합니다!');
                return;
              }
            }}
          >
            <img
              src={edit_document_white_24dp}
              alt='작성하기'
            />
            작성하기
          </SolidButton>
        </WriteSearchWrap>
      </WriteButton>
      {list === null ? null : (
        <>
          {list[0].index === '' ? (
            <TitleText text='게시글이 없습니다.' />
          ) : (
            <>
              {list.map((i) => {
                return (
                  <BoardList
                    key={i.index}
                    index={i.index}
                    title={i.title}
                    nickname={i.nickname}
                    date={i.date}
                    commentCount={i.commentCount}
                    likes={i.likes}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </BoardWrap>
  );
};

export default BoardSearchResult;
