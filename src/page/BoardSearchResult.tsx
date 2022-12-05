import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SolidButton } from '../components/BtnGroup';
import TitleText from '../components/TitleText';
import add_like from '../img/add_like.svg';
import comment_img from '../img/commentLine_img.svg';
import edit_document_white_24dp from '../img/edit_document_white_24dp.svg';
import 돋보기 from '../img/돋보기.svg';
import { useAppSelector } from '../store/store';
import customAxios from '../util/customAxios';
import { elapsedTime } from '../util/returnTodayString';
import { Title } from './Board';

const BoardWrap = styled.div`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 310px);
  /* height: calc(100vh - 310px); */
`;

const BoardLi = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 15px 10px;
  border-bottom: 1px solid#dadde6;
  width: 100%;
  justify-content: space-around;

  & .title > span:hover {
    font-weight: bold;
  }

  & .title {
    width: 90%;
    padding: 10px 0;
    display: flex;
    align-items: center;
  }
  & .title > span {
    font-size: 1.1em;
    display: block;
    height: 20px;
    cursor: pointer;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media ${({ theme }) => theme.device.tablet} {
    & .title > span {
      width: 100%;
    }
    & .title {
      width: 100%;
    }
  }

  & .topInfo {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9em;
  }

  & .frontInfo {
    display: flex;
    align-items: center;
  }

  & .nickname {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .secondInfo {
    display: flex;
    align-items: center;
  }
  & .date {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & .comment {
    display: flex;
    align-items: center;
  }
  & .like {
    display: flex;
    align-items: center;
  }
  & .comment img {
    width: 20px;
  }
  & .like img {
    width: 20px;
  }
  & .comment span {
    margin-left: 5px;
  }
  & .like span {
    margin-left: 5px;
  }

  & .line {
    display: inline-block;
    border-left: 1px solid #dadde6;
    margin: 0 10px;
    height: 15px;
  }
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
              onKeyDown={(e) => {
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
            text='작성하기'
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
                  <React.Fragment key={i.index}>
                    <BoardLi>
                      <div className='topInfo'>
                        <div className='frontInfo'>
                          <span className='nickname'>{i.nickname}</span>
                          <div className='line'></div>
                          <span className='date'>{elapsedTime(i.date)}</span>
                        </div>
                        <div className='secondInfo'>
                          <div className='comment'>
                            <img
                              src={comment_img}
                              alt='댓글'
                            />
                            <span>{i.commentCount}</span>
                          </div>
                          <div className='line'></div>
                          <div className='like'>
                            <img
                              src={add_like}
                              alt='좋아요'
                            />
                            <span>{i.likes}</span>
                          </div>
                        </div>
                      </div>
                      <p className='title'>
                        <span
                          onClick={() => {
                            //여기서 디스패치해서 제목과 콘텐츠를 가져와야할듯?
                            //해당 페이지에서 새로고침 시 값을 가져오질못함..해당컴포넌트에서 useEffect를 이용해야 새로고침에도 데이터 획득가능
                            // dispatch(BoardViewService.getBoard({ number: i.index }))
                            customAxios('put', `/board/view?number=${i.index}`);
                            navigate(`/board/posts/${i.index}`);
                          }}
                        >
                          {i.title}
                        </span>
                      </p>
                    </BoardLi>
                  </React.Fragment>
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
