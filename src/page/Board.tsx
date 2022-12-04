import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import { SolidButton } from '../components/BtnGroup';
import TitleText from '../components/TitleText';
import customAxios from '../util/customAxios';
import comment_img from '../img/commentLine_img.svg';
import add_like from '../img/add_like.svg';
import 돋보기 from '../img/돋보기.svg';
import 왼쪽화살표 from '../img/왼쪽화살표.svg';
import 오른쪽화살표 from '../img/오른쪽화살표.svg';
import edit_document_white_24dp from '../img/edit_document_white_24dp.svg';
import { elapsedTime } from '../util/returnTodayString';
import { useAppSelector } from '../store/store';
import theme from '../layout/theme';
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

interface PageBtnInterface {
  active?: boolean;
  disabled?: boolean;
}

const PageWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const PageBtn = styled.button<PageBtnInterface>`
  cursor: pointer;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 30px;
  /* border-left: 1px solid #dadde6; */
  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
  ${(props) =>
    props.active &&
    css`
      color: ${({ theme }) => theme.colors.main};
      font-weight: bold;
    `}
  &:disabled {
    & img {
      opacity: 0.4;
    }
  }
`;
const Title = styled.h1`
  font-size: 2em;
  padding: 15px 0;
  display: block;
  font-weight: bold;
  word-break: keep-all;
  justify-content: flex-start;
  flex-shrink: 0;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8em;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.6em;
  }
`;

const Board = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef() as RefObject<HTMLInputElement>;
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const [list, setList] = useState<null | BoardListInterface[]>(null);

  //보여줄 페이지 사이즈
  const PAGE_SIZE = 5;
  //총 페이지 수
  let total: number = 0;
  //리스트에 따른 페이지 갯수
  const [pages, setPages] = useState<number[]>([]);
  //전체 랭킹에 보여줄 10개의 리스트
  const [list2, setList2] = useState<[]>([]);
  //현재 보여주고있는 페이지번호
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  //현재 보여주고있는 페이지버튼 리스트
  const [pageList, setPageList] = useState<number[]>([]);

  const call = async (currentPageNum: number): Promise<void> => {
    let payloadObj = await customAxios('get', `/board/list?page=${currentPageNum}`, {
      currentPageNum,
    }).then((res) => {
      // 10개의 게시글을 불러온다.
      console.log(res.data.payload);
      return res.data.payload;
    });
    setList(() => payloadObj.data);
    //토탈페이지수를 변수에 할당해준다.
    total = payloadObj.listNum;
    //페이지 정수를 받아와 배열 생성 후 setState해준다.
    //https://hjcode.tistory.com/73
    let pagesNum = Array.from({ length: payloadObj.listNum }, (v, i) => i);
    setPages([...pagesNum]);
    foo(currentPageNum);
  };

  let arr: any = [];
  const foo = (currentPage: number) => {
    //현재 페이지와 페이즈사이즈를 나눠 1이 남았을 때 이 후 번호의 배열을 생성
    if (currentPage % PAGE_SIZE === 1) {
      let idx = 1; // 이 수를 current에 더 해준다.
      arr = [currentPage];

      /*
        아래 두 조건이 거짓이 될 때까지 반복한다.
        1. 현재 페이지와 idx를 더한 값이 총 페이지보다 작거나 같을 때
        2. 펼칠 페이지 배열의 길이가 페이지사이즈보다 작을 때
  
        1번 조건은 배열에 들어갈 페이지값을 구하는것이다.
        총페이지 7 기준으로 현재 페이지에 1++을 더 했을 때 작거나같으므로 배열에 4,5,6,7이가 추가된다.
        8(앞의 피연산자)은 7(총페이지)보다 크므로 조건이 거짓이 되고, [ 4,5,6,7 ] 로 1번 조건이 종료된다.
  
        2번 조건은 1번의 부족한 논리를 보충하여, 펼칠 페이지 사이즈만큼의 배열을 만들기위함이다.
        우리가 원하는 페이지사이즈는 3인데 1번조건은 4개까지 생성했다.
        배열의 길이가 페이지 사이즈보다 작을 때까지만 true를 반환하고
        페이지 사이즈보다 큰 [4,5,6,7]은 거짓으로 연산되어
        [4,5,6,7]이 아닌 [4,5,6]을 반환하게 된다.
        */
      while (currentPage + idx <= total && arr.length < PAGE_SIZE) {
        arr.push(currentPage + idx);
        idx++;
      }
      setPageList([...arr]);
    } else if (currentPage % PAGE_SIZE === 0) {
      let idx = 1;
      arr = [currentPage];
      while (arr.length < PAGE_SIZE) {
        arr.unshift(currentPage - idx);
        idx++;
      }
      console.log(arr);
      setPageList([...arr]);
    }
  };

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

  useEffect(() => {
    call(currentPageNum);
  }, [currentPageNum]);

  // useEffect(() => {
  //   customAxios('get', '/board', {}).then((res) => {
  //     console.log(res.data);
  //     if (res.data.length === 0) {
  //       setList([
  //         {
  //           index: '',
  //           title: '',
  //           nickname: '',
  //           date: '',
  //           commentCount: '',
  //           view: '',
  //           likes: '',
  //         },
  //       ]);
  //       return;
  //     } else {
  //       setList(res.data);
  //     }
  //   });
  // }, []);

  const searchBoardFunc = () => {
    console.log(searchInputRef.current!.value);
    const keyword = searchInputRef.current!.value;
    if (keyword.length < 2) {
      alert('검색어를 두 글자 이상입력해주세요!');
    } else {
      navigate(`/board/list/search/${keyword}`);
    }
  };

  //데이터가 들어왔을 때 한번에 렌더링해준다.
  // if (list === null) {
  //   return null;
  // }

  return (
    <ThemeProvider theme={theme}>
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
        <PageWrap>
          <PageBtn
            disabled={currentPageNum === 1}
            data-prev='backward'
            onClick={() => {
              setCurrentPageNum((prev) => prev - 1);
            }}
          >
            <img
              src={왼쪽화살표}
              alt='뒤로'
            ></img>
          </PageBtn>
          {pageList!.map((i: any, index: any) => (
            <PageBtn
              key={i}
              active={currentPageNum === i}
              onClick={(e) => {
                setCurrentPageNum(i);
              }}
            >
              {i}
            </PageBtn>
          ))}
          <PageBtn
            data-prev='forward'
            disabled={currentPageNum === pages.length}
            onClick={() => {
              setCurrentPageNum((prev) => prev + 1);
            }}
          >
            <img
              src={오른쪽화살표}
              alt='앞으로'
            ></img>
          </PageBtn>
        </PageWrap>
      </BoardWrap>
    </ThemeProvider>
  );
};

export default Board;
