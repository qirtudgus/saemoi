import { useNavigate, useParams } from 'react-router-dom';
// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import customAxios from '../util/customAxios';
import { useAppSelector } from '../store/store';
import ErrorPage from './ErrorPage';
import styled, { css, keyframes, ThemeProvider } from 'styled-components';
import { elapsedTime, returnTodayString } from '../util/returnTodayString';
import TitleText from '../components/TitleText';
import { BasicButton, SolidButton } from '../components/BtnGroup';
import theme from '../layout/theme';
import more_horiz from '../img/more_horiz.svg';
import nestedCommentArrow from '../img/nestedCommentArrow.svg';
import add_like from '../img/add_like2.svg';
import remove_like from '../img/remove_like.svg';

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

const WriteNestedCommentWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #575757;
  border: 1px solid#dadde6;
  border-top: none;
  border-radius: 0 0 5px 5px;
  height: 220px;
  padding: 10px 0;
`;

const CommentArea = styled.textarea`
  position: relative;
  padding: 10px;
  height: 150px;
  border: 1px solid #dadde6;
  border-radius: 2px;
  width: 98.5%;
  background-color: #35363a;
  color: #fff;
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

const CommentLikeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  & p {
    padding: 0px 10px;
  }
`;

const CommentList = styled.div`
  white-space: pre;
`;
const MainComment = styled.div`
  padding: 15px;
  border-bottom: 1px solid#dadde6;
`;

const NestedCommentWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const NestedComment = styled.div`
  width: 100%;
  padding: 15px 15px 15px 40px;

  border-bottom: 1px solid#dadde6;
  background: #575757;
`;

const CommentUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
`;

const NicknameAndTime = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  & img {
    opacity: 0.5;
    width: 20px;
    position: absolute;
    left: -29px;
  }
`;

const CommentContent = styled.div`
  padding: 25px 0;
`;

const ContentButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
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
  color: #000;
  & img {
    opacity: 0.6;
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

interface LikeMove {
  isLike: boolean;
}

const LikeButtonBox = styled.button<LikeMove>`
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.main};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  user-select: none;
  background-color: #35363a;
  ${(props) =>
    props.isLike &&
    css`
      background-color: ${({ theme }) => theme.colors.main};
    `}

  & img {
    width: 25px;
  }
`;

const View = () => {
  const navigate = useNavigate();
  const [undifinedContent, setUndifinedContent] = useState(false);
  const [clickCommentIndex, setClickCommentIndex] = useState<number>(-1);

  let { number } = useParams();
  const id = useAppSelector((state) => state.user.id);
  const nickname = useAppSelector((state) => state.user.nickname);
  const isLogin = useAppSelector((state) => state.user.isLogin);
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

  const getViewPostApi = () => {
    customAxios('get', `/board/posts?number=${number}`, {}).then((res) => {
      console.log(res.status);
      console.log(res.data);
      if (res.status === 201) {
        setUndifinedContent(true);
      } else {
        setContent(res.data);
      }
    });
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
  }, [number]);

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

  //데이터가 들어왔을 때 한번에 렌더링해준다.
  if (content.index === '') return null;

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
            </div>
            <CommentLikeWrap>
              <LikeButtonBox
                title={content.likeUserList.includes(id + ',') ? '추천 취소' : '추천'}
                onClick={
                  content.likeUserList.includes(id + ',')
                    ? () => {
                        if (isLogin) {
                          customAxios('put', `/board/like?number=${number}&&behavior=0&&id=${id}`).then((res) => {
                            console.log('싫어요 시도');
                            getViewPostApi();
                          });
                        } else {
                          alert('로그인 후 이용 가능합니다!');
                          return;
                        }
                      }
                    : () => {
                        if (isLogin) {
                          customAxios('put', `/board/like?number=${number}&&behavior=1&&id=${id}`).then((res) => {
                            console.log('좋아요 시도');
                            getViewPostApi();
                          });
                        } else {
                          alert('로그인 후 이용 가능합니다!');
                          return;
                        }
                      }
                }
                isLike={content.likeUserList.includes(id + ',')}
              >
                {content.likeUserList.includes(id + ',') ? <img src={add_like} /> : <img src={remove_like}></img>}
              </LikeButtonBox>
              <p>{content.likes}</p>
            </CommentLikeWrap>
            {content.id === id && (
              <ContentButtonGroup>
                <BasicButton
                  OnClick={() => {
                    navigate(`/board/edit/${number}`);
                  }}
                >
                  수정
                </BasicButton>
                <BasicButton
                  ClassName='ml_10'
                  OnClick={postDeleteSumbit}
                >
                  삭제
                </BasicButton>
              </ContentButtonGroup>
            )}
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
                              {i.id === id ? (
                                <>
                                  {i.isDeleted === 'true' ? null : (
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
                                        {/* <li
                                          onClick={() => {
                                            alert('수정하시겠습니가?');
                                          }}
                                        >
                                          수정하기
                                        </li> */}
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
                                                  getViewPostApi();
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
                                  )}
                                </>
                              ) : null}
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
                          </MainComment>
                        ) : (
                          <>
                            {i.isDeleted === 'true' ? (
                              <NestedCommentWrap>
                                <NestedComment>
                                  <CommentUserInfo>
                                    <NicknameAndTime>
                                      <img
                                        src={nestedCommentArrow}
                                        alt='nestedCommentArrow'
                                      ></img>
                                      <span>{i.nickname}</span>
                                      <VerticalLine />
                                      <span>{elapsedTime(i.date)}</span>
                                    </NicknameAndTime>
                                  </CommentUserInfo>
                                  <CommentContent>
                                    <span>{i.content}</span>
                                  </CommentContent>
                                </NestedComment>
                              </NestedCommentWrap>
                            ) : (
                              //대댓글 컴포넌트 제작
                              <>
                                <NestedCommentWrap>
                                  <NestedComment>
                                    <CommentUserInfo>
                                      <NicknameAndTime>
                                        <img
                                          src={nestedCommentArrow}
                                          alt='nestedCommentArrow'
                                        ></img>
                                        <span>{i.nickname}</span>
                                        <VerticalLine />
                                        <span>{elapsedTime(i.date)}</span>
                                      </NicknameAndTime>
                                      {i.id === id ? (
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
                                            {/* <li
                                              onClick={() => {
                                                alert('수정하시겠습니가?');
                                              }}
                                            >
                                              수정하기
                                            </li> */}
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
                                                      getViewPostApi();

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
                                      ) : null}
                                    </CommentUserInfo>
                                    <CommentContent>
                                      <span>{i.content}</span>
                                    </CommentContent>
                                  </NestedComment>
                                </NestedCommentWrap>
                              </>
                            )}
                          </>
                        )}

                        {/* 대댓글 컴포넌트 */}
                        {clickCommentIndex === index ? (
                          <>
                            <WriteNestedCommentWrap>
                              <CommentArea
                                placeholder='답글을 입력해주세요.'
                                ref={nestedCommentRef}
                                cols={40}
                                rows={5}
                              ></CommentArea>
                              <SolidButtonWrap>
                                <span>건강한 답글을 달면 모두가 건강해져요!</span>
                                <SolidButton
                                  OnClick={() => {
                                    console.log(nestedCommentRef.current?.value);

                                    if (isLogin) {
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
                                          alert('답글이 등록되었습니다!');
                                          getViewPostApi();
                                          //대댓글 등록 후 대댓글컴포넌트 제거
                                          setClickCommentIndex(-1);
                                          console.log(res.data);
                                        }
                                      });
                                    } else {
                                      alert('로그인 후 이용 가능합니다!');
                                      return;
                                    }
                                  }}
                                >
                                  답글 등록
                                </SolidButton>
                              </SolidButtonWrap>
                            </WriteNestedCommentWrap>
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
                placeholder='댓글을 입력해주세요.'
                ref={commentRef}
                cols={40}
                rows={5}
              ></CommentArea>
              <SolidButtonWrap>
                <span>건강한 댓글을 달면 모두가 건강해져요!</span>
                <SolidButton
                  OnClick={() => {
                    if (isLogin) {
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
                            getViewPostApi();
                            commentRef.current!.value = '';
                            console.log(res.data);
                          }
                        },
                      );
                    } else {
                      alert('로그인 후 이용 가능합니다!');
                      return;
                    }
                  }}
                >
                  댓글 등록
                </SolidButton>
              </SolidButtonWrap>
            </CommentWrap>
          </>
        )}
      </ViewWrap>
    </ThemeProvider>
  );
};

export default View;
