import { useNavigate, useParams } from 'react-router-dom';
// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import customAxios from '../util/customAxios';
import { useAppSelector } from '../store/store';
import ErrorPage from './ErrorPage';
import styled, { ThemeProvider } from 'styled-components';
import { elapsedTime, returnTodayString } from '../util/returnTodayString';
import TitleText from '../components/TitleText';
import { BasicButton, SolidButton } from '../components/BtnGroup';
import theme from '../layout/theme';
import more_horiz from '../img/more_horiz.svg';

const ViewWrap = styled.div`
  height: auto;
  min-height: calc(100vh - 310px);
`;

const ViewTitle = styled.p`
  font-size: 2em;
  font-weight: bold;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8em;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5em;
  }
`;
const ViewContent = styled.div`
  margin: 30px 0;
  min-height: 50px;
`;

const UserInfoWrap = styled.div`
  margin: 30px 0;

  & .editDate {
    margin-top: 5px;
    color: #888;
    font-size: 0.9em;
  }
`;

const ContentUserInfo = styled.div`
  display: flex;
`;

const CommentWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid#dadde6;
  border-radius: 5px;
  height: 220px;
  padding: 10px 0;
  margin-top: 30px;
`;

const CommentArea = styled.textarea`
  position: relative;
  padding: 10px;
  height: 150px;
  border: 1px solid #dadde6;
  border-radius: 2px;
  width: 98.5%;
  &:hover {
    border: 1px solid #000;
  }
  &:focus {
    outline: none;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 97.5%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 93.5%;
  }
`;

const SolidButtonWrap = styled.div`
  width: 98.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  & span {
    color: #888;
    word-break: keep-all;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 97.5%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 93.5%;
  }
`;

const BorderLine = styled.div`
  border-top: 1px solid#dadde6;
  width: 100%;
  margin: 50px 0;
`;

const VerticalLine = styled.div`
  display: inline-block;
  border-left: 1px solid #dadde6;
  margin: 0 10px;
  height: 15px;
`;

const CommentLikeWrap = styled.div``;

const CommentList = styled.div`
  white-space: pre;

  & button {
    margin: 10px;
    padding: 10px;
  }
`;

const MainComment = styled.div`
  padding: 15px;
  border-bottom: 1px solid#dadde6;
`;

const CommentUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
`;

const NicknameAndTime = styled.div`
  display: flex;
  align-items: center;
`;

const CommentContent = styled.div`
  padding: 5px 0 10px 0;
`;

const MoreButtonGroup = styled.div`
  width: auto;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  z-index: 2;
  width: 20px;
  height: 20px;
  display: flex;
  position: relative;
  align-items: center;
  & img {
    position: relative;
    z-index: 1;
    width: 20px;
    pointer-events: none;
  }
  & img:hover {
    opacity: 0.8;
  }
  & ul {
    background-color: #fff;

    z-index: 10;
    width: 100px;
    height: 70px;
    border: 1px solid #ddd;
    border-radius: 5px;
    position: absolute;
    top: 5px;
    right: 22px;

    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    display: none;
  }
  &.active ul {
    display: flex;
  }
  & li {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & li:hover {
    font-weight: bold;
    background-color: #eee;
  }
`;

const View = () => {
  const navigate = useNavigate();
  const [undifinedContent, setUndifinedContent] = useState(false);
  const [clickCommentIndex, setClickCommentIndex] = useState<number>(-1);
  const [writeCommentAfterRendering, setWriteCommentAfterRendering] = useState(false);

  let { number } = useParams();
  const id = useAppSelector((state) => state.user.id);
  const nickname = useAppSelector((state) => state.user.nickname);
  const commentRef = useRef() as RefObject<HTMLTextAreaElement>;
  const nestedCommentRef = useRef() as RefObject<HTMLTextAreaElement>;

  interface BoardInterface {
    title: string;
    content: string;
    date: string;
    nickname: string;
    id: string;
    index: string;
    likes: '';
    latestEditDate: string;
    likeUserList: string;
    comment: CommentInterface[];
  }

  interface CommentInterface {
    index: string;
    content: string;
    nickname: string;
    id: string;
    date: string;
    order: string;
    depth: string;
    isDeleted: string;
  }

  const [content, setContent] = useState<BoardInterface>({
    title: '',
    content: '',
    date: '',
    nickname: '',
    id: '',
    index: '',
    latestEditDate: '',
    likes: '',
    likeUserList: '',
    comment: [
      {
        index: '',
        content: '',
        nickname: '',
        id: '',
        date: '',
        order: '',
        depth: '',
        isDeleted: 'false',
      },
    ],
  });

  const postDeleteSumbit = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      customAxios('delete', `/board/posts?number=${number}`).then((res) => {
        if (res.status === 200) {
          navigate('/board/list');
        }
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    customAxios('get', `/board/posts?number=${number}`, {}).then((res) => {
      console.log(res.status);
      console.log(res.data);
      if (res.status === 201) {
        setUndifinedContent(true);
      } else {
        setContent(res.data);
      }
    });
  }, [number, writeCommentAfterRendering]);

  useEffect(() => {
    let deleteModal = (e: any) => {
      console.log(e.target.className);
      if (e.target.className.includes('ulList active')) {
        console.log('액티브가 있네요');
      } else {
        let a = document.querySelectorAll('.ulList');
        a.forEach((i) => {
          i.classList.remove('active');
        });
      }
    };
    document.addEventListener('click', deleteModal);
    return () => document.removeEventListener('click', deleteModal);
  });

  /*
  이미 삭제된 게시물에 대한 예외처리 꼭 해주자!!!!!!!!!!!!!
  */

  return (
    <ThemeProvider theme={theme}>
      <ViewWrap>
        {undifinedContent ? (
          <ErrorPage />
        ) : (
          <>
            <div>
              <UserInfoWrap>
                <ContentUserInfo>
                  <span>{content.nickname}</span>
                  <VerticalLine />
                  <span>{content.date}</span>
                </ContentUserInfo>
                {content.latestEditDate === '' ? null : (
                  <p className='editDate'>
                    마지막 수정 날짜 <span>{content.latestEditDate}</span>
                  </p>
                )}
              </UserInfoWrap>
              <ViewTitle>{content.title}</ViewTitle>
              <ViewContent>{content.content === '' ? null : <Viewer initialValue={content.content} />}</ViewContent>
              {content.id === id ? (
                <>
                  <BasicButton
                    text='수정'
                    OnClick={() => {
                      navigate(`/board/edit/${number}`);
                    }}
                  />
                  <BasicButton
                    ClassName='ml_10'
                    text='삭제'
                    OnClick={postDeleteSumbit}
                  />
                </>
              ) : null}
            </div>
            <CommentLikeWrap>
              <p>추천수 : {content.likes}</p>
              {content.likeUserList.includes(id + ',') ? (
                <button
                  onClick={() => {
                    customAxios('put', `/board/like?number=${number}&&behavior=0&&id=${id}`).then((res) => {
                      console.log('싫어요 시도');
                      setWriteCommentAfterRendering((prev) => !prev);
                    });
                  }}
                >
                  추천취소
                </button>
              ) : (
                <button
                  onClick={() => {
                    customAxios('put', `/board/like?number=${number}&&behavior=1&&id=${id}`).then((res) => {
                      console.log('좋아요 시도');
                      setWriteCommentAfterRendering((prev) => !prev);
                    });
                  }}
                >
                  추천
                </button>
              )}
            </CommentLikeWrap>
            <BorderLine />

            <CommentList>
              {content.comment.length === 0 ? (
                <p>댓글이 없습니다.</p>
              ) : (
                <>
                  {content.comment.map((i, index) => {
                    return (
                      <React.Fragment key={i.index}>
                        {i.depth === '0' ? (
                          <MainComment>
                            <CommentUserInfo>
                              <NicknameAndTime>
                                <span>{i.nickname}</span>
                                <VerticalLine />
                                <span>{elapsedTime(i.date)}</span>
                              </NicknameAndTime>
                              <MoreButtonGroup
                                className='ulList'
                                onClick={(e) => {
                                  if (e.currentTarget.className.includes('ulList active')) {
                                    e.currentTarget.classList.remove('active');
                                  } else {
                                    document.querySelectorAll('.ulList').forEach((i) => {
                                      i.classList.remove('active');
                                    });
                                    e.currentTarget.classList.toggle('active');
                                  }
                                }}
                              >
                                <img
                                  src={more_horiz}
                                  alt='더보기'
                                />
                                <ul>
                                  <li
                                    onClick={() => {
                                      alert('수정하시겠습니가?');
                                    }}
                                  >
                                    수정하기
                                  </li>
                                  <li
                                    onClick={() => {
                                      console.log(`${i.index}번 댓글 삭제 시도`);
                                      if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
                                        customAxios(
                                          'put',
                                          `/comment?commentNumber=${i.index}&&boardNumber=${number}`,
                                          {},
                                        ).then((res) => {
                                          if (res.status === 200) {
                                            setWriteCommentAfterRendering((prev) => !prev);
                                            document.querySelectorAll('.ulList').forEach((i) => {
                                              i.classList.remove('active');
                                            });
                                          }
                                        });
                                      }
                                    }}
                                  >
                                    삭제하기
                                  </li>
                                </ul>
                              </MoreButtonGroup>
                            </CommentUserInfo>
                            <CommentContent>
                              <span>{i.content}</span>
                            </CommentContent>
                            {i.depth === '0' && (
                              <span
                                onClick={() => {
                                  if (clickCommentIndex === index) {
                                    setClickCommentIndex(-1);
                                  } else {
                                    setClickCommentIndex(index);
                                  }

                                  console.log(clickCommentIndex);
                                }}
                              >
                                답글
                              </span>
                            )}

                            {/* 사용자가 같으며, 댓글이 삭제되지않은 상태일때만 삭제버튼 렌더링 */}
                            {i.id === id && i.isDeleted === 'false' && (
                              <>
                                <button
                                  onClick={() => {
                                    console.log(`${i.index}번 댓글 삭제 시도`);
                                    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
                                      customAxios(
                                        'put',
                                        `/comment?commentNumber=${i.index}&&boardNumber=${number}`,
                                        {},
                                      ).then((res) => {
                                        if (res.status === 200) {
                                          setWriteCommentAfterRendering((prev) => !prev);
                                        }
                                      });
                                    }
                                  }}
                                >
                                  삭제
                                </button>
                              </>
                            )}
                          </MainComment>
                        ) : (
                          <>
                            {i.isDeleted === 'true' ? (
                              <p>삭제된 댓글입니다.</p>
                            ) : (
                              <>
                                <TitleText text='대댓글'></TitleText>
                                <p>{i.nickname}</p>
                                <p>{i.content}</p>
                                <p>{i.date}</p>
                              </>
                            )}
                          </>
                        )}

                        {/* 대댓글 컴포넌트 */}
                        {clickCommentIndex === index ? (
                          <>
                            <CommentWrap>
                              <CommentArea
                                ref={nestedCommentRef}
                                cols={40}
                                rows={5}
                              ></CommentArea>
                            </CommentWrap>
                            <button
                              onClick={() => {
                                console.log(nestedCommentRef.current?.value);
                                //<br>태그로 치환하지않고 그냥 db에 넣었다빼는것이 비용이 덜 들겠다.
                                //치환하고나면 다시 여기와서 \n으로 치환해줘야하는데, 댓글이 많을수록 비용도 곱해진다.
                                // let content = commentRef.current?.value.replaceAll('\n', '<br>');
                                let content = nestedCommentRef.current?.value;
                                let date = returnTodayString();
                                customAxios('post', '/comment/write/nested', {
                                  board_index: number,
                                  comment_index: i.index,
                                  content,
                                  date,
                                  id,
                                  nickname,
                                }).then((res) => {
                                  if (res.status === 200) {
                                    alert('대댓글이 등록되었습니다!');
                                    setWriteCommentAfterRendering((prev) => !prev);
                                    //대댓글 등록 후 대댓글컴포넌트 제거
                                    setClickCommentIndex(-1);
                                    console.log(res.data);
                                  }
                                });
                              }}
                            >
                              대댓글등록
                            </button>
                          </>
                        ) : null}
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </CommentList>

            <CommentWrap>
              <CommentArea
                ref={commentRef}
                cols={40}
                rows={5}
              ></CommentArea>
              <SolidButtonWrap>
                <span>건강한 댓글을 달면 모두가 건강해져요!</span>
                <SolidButton
                  text='댓글 등록'
                  OnClick={() => {
                    console.log(commentRef.current?.value);
                    //<br>태그로 치환하지않고 그냥 db에 넣었다빼는것이 비용이 덜 들겠다.
                    //치환하고나면 다시 여기와서 \n으로 치환해줘야하는데, 댓글이 많을수록 비용도 곱해진다.
                    // let content = commentRef.current?.value.replaceAll('\n', '<br>');
                    let content2 = commentRef.current?.value;
                    let date = returnTodayString();
                    customAxios('post', '/comment/write', { board_index: number, content2, date, id, nickname }).then(
                      (res) => {
                        if (res.status === 200) {
                          alert('댓글이 등록되었습니다!');
                          setWriteCommentAfterRendering((prev) => !prev);
                          commentRef.current!.value = '';
                          console.log(res.data);
                        }
                      },
                    );
                  }}
                ></SolidButton>
              </SolidButtonWrap>
            </CommentWrap>
          </>
        )}
      </ViewWrap>
    </ThemeProvider>
  );
};

export default View;
