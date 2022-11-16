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
    color: #aaa;
    font-size: 0.9em;
  }
`;

const ContentUserInfo = styled.div`
  display: flex;
`;

const CommentWrap = styled.div`
  position: relative;
`;

const CommentArea = styled.textarea`
  position: relative;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 2px;
  &:hover {
    border: 1px solid #000;
  }
  &:focus {
    outline: none;
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
  padding: 15px 0;
  border-bottom: 1px solid#dadde6;
`;
const CommentUserInfo = styled.div`
  display: flex;
`;
const CommentContent = styled.div`
  padding: 5px 0 10px 0;
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
                              <span>{i.nickname}</span>
                              <VerticalLine />
                              <span>{elapsedTime(i.date)}</span>
                            </CommentUserInfo>
                            <CommentContent>
                              <span>{i.content}</span>
                            </CommentContent>
                          </MainComment>
                        ) : (
                          <>
                            {i.isDeleted === 'true' ? (
                              <p>삭제된 댓글입니다.</p>
                            ) : (
                              <>
                                <TitleText text='대댓글'></TitleText>
                                <p>
                                  <span>{i.nickname}</span>
                                </p>
                                <p>
                                  <span>{i.content}</span>
                                </p>
                                <p>
                                  <span>{i.date}</span>
                                </p>
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
                        {i.depth === '0' && (
                          <button
                            onClick={() => {
                              setClickCommentIndex(index);
                              console.log(clickCommentIndex);
                            }}
                          >
                            대댓글
                          </button>
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
            </CommentWrap>

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
          </>
        )}
      </ViewWrap>
    </ThemeProvider>
  );
};

export default View;
