import { useNavigate, useParams } from 'react-router-dom';
// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import customAxios from '../util/customAxios';
import { useAppSelector } from '../store/store';

const View = () => {
  const navigate = useNavigate();
  let { number } = useParams();
  const id = useAppSelector((state) => state.user.id);

  interface BoardInterface {
    title: string;
    content: string;
    date: string;
    nickname: string;
    id: string;
    index: string;
    latestEditDate: string;
  }
  const [content, setContent] = useState<BoardInterface>({
    title: '',
    content: '',
    date: '',
    nickname: '',
    id: '',
    index: '',
    latestEditDate: '',
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
      console.log(res.data);
      setContent(res.data);
    });
  }, [number]);

  /*
  이미 삭제된 게시물에 대한 예외처리 꼭 해주자!!!!!!!!!!!!!
  */

  return (
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
    </>
  );
};

export default View;
