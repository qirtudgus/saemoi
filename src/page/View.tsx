import { useNavigate, useParams } from 'react-router-dom';
// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import customAxios from '../util/customAxios';
import { useAppSelector } from '../store/store';
import ErrorPage from './ErrorPage';
import styled from 'styled-components';
import { returnTodayString } from '../util/returnTodayString';

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

const CommentList = styled.div`
  white-space: pre;
`;

const View = () => {
  const navigate = useNavigate();
  const [undifinedContent, setUndifinedContent] = useState(false);
  const [writeCommentAfterRendering, setWriteCommentAfterRendering] = useState(false);
  let { number } = useParams();
  const id = useAppSelector((state) => state.user.id);
  const nickname = useAppSelector((state) => state.user.nickname);
  const commentRef = useRef() as RefObject<HTMLTextAreaElement>;

  interface BoardInterface {
    title: string;
    content: string;
    date: string;
    nickname: string;
    id: string;
    index: string;
    latestEditDate: string;
    comment: CommentInterface[];
  }

  interface CommentInterface {
    index: string;
    content: string;
    nickname: string;
    id: string;
    date: string;
  }

  const [content, setContent] = useState<BoardInterface>({
    title: '',
    content: '',
    date: '',
    nickname: '',
    id: '',
    index: '',
    latestEditDate: '',
    comment: [{ index: '', content: '', nickname: '', id: '', date: '' }],
  });

  const postDeleteSumbit = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      customAxios('delete', `/board/posts?number=${number}`).then((res) => {
        if (res.status === 200) {
          alert('게시물이 삭제되었습니다.');
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
    <>
      {undifinedContent ? (
        <ErrorPage />
      ) : (
        <>
          <div>
            <p>{content.date}</p>
            {content.latestEditDate === '' ? null : (
              <p>
                마지막 수정 날짜<span>{content.latestEditDate}</span>
              </p>
            )}
            <p>{content.nickname}</p>
            <p>{content.title}</p>

            {content.title === '' ? null : <Viewer initialValue={content.content} />}
            {content.id === id ? (
              <>
                <button onClick={postDeleteSumbit}>삭제</button>
                <button
                  onClick={() => {
                    navigate(`/board/edit/${number}`);
                  }}
                >
                  수정
                </button>
              </>
            ) : null}
          </div>
          <CommentList>
            {content.comment.length === 0 ? (
              <p>댓글이 없습니다.</p>
            ) : (
              <>
                {content.comment.map((i) => {
                  return (
                    <React.Fragment key={i.index}>
                      <p>
                        댓글 작성자 : <span>{i.nickname}</span>
                      </p>
                      <p>
                        댓글 내용 : <span>{i.content}</span>
                      </p>
                      <p>
                        댓글 작성시간 : <span>{i.date}</span>
                      </p>
                      {i.id === id && (
                        <>
                          <button>수정</button>
                          <button
                            onClick={() => {
                              console.log(`${i.index}번 댓글 삭제 시도`);
                              if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
                                customAxios(
                                  'delete',
                                  `/comment?commentNumber=${i.index}&&boardNumber=${number}`,
                                  {},
                                ).then((res) => {
                                  if (res.status === 200) {
                                    alert('댓글이 삭제되었습니다.');
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
          <button
            onClick={() => {
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
          >
            댓글등록
          </button>
        </>
      )}
    </>
  );
};

export default View;
