import { useNavigate, useParams } from 'react-router-dom';
// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { RefObject, useEffect, useRef, useState } from 'react';
import customAxios from '../util/customAxios';
import { useAppSelector } from '../store/store';
import { Editor } from '@toast-ui/react-editor';

const PostEdit = () => {
  const navigate = useNavigate();
  let { number } = useParams();
  const id = useAppSelector((state) => state.user.id);
  const editorRef = useRef() as RefObject<Editor>;
  const titleRef = useRef() as RefObject<HTMLInputElement>;

  interface BoardInterface {
    title: string;
    content: string;
    date: string;
    nickname: string;
    id: string;
    index: string;
  }
  const [content, setContent] = useState<BoardInterface>({
    title: '',
    content: '',
    date: '',
    nickname: '',
    id: '',
    index: '',
  });

  // 수정 버튼 핸들러
  const handleRegisterButton = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '.' + month + '.' + day;
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let timeString = hours + ':' + minutes;
    let latestEditDate = dateString + ' ' + timeString;
    let title = titleRef!.current!.value;
    let content = editorRef!.current!.getInstance().getHTML();
    customAxios('put', `/board/edit?number=${number}`, { title, content, latestEditDate }).then((res) => {
      if (res.status === 200) {
        alert('게시물이 수정되었습니다!');
        navigate('/board/list');
      }
    });
  };

  useEffect(() => {
    customAxios('get', `/board/posts?number=${number}`, {}).then((res) => {
      setContent(res.data);
      titleRef!.current!.value = res.data.title;
    });
  }, [number]);

  return (
    <>
      <div>
        <input ref={titleRef}></input>
        {content.id === '' ? null : (
          <Editor
            initialValue={content.content}
            ref={editorRef} // DOM 선택용 useRef
            placeholder='내용을 입력해주세요.'
            previewStyle='vertical' // 미리보기 스타일 지정
            height='350px' // 에디터 창 높이
            initialEditType='wysiwyg' // 초기 입력모드 설정(디폴트 markdown)
            hideModeSwitch={true}
            language='ko-KR'
            toolbarItems={[
              // 툴바 옵션 설정
              ['image', 'link'],
            ]}
          ></Editor>
        )}
      </div>
      {content.id === id ? (
        <>
          <button onClick={handleRegisterButton}>수정</button>
        </>
      ) : null}
    </>
  );
};

export default PostEdit;
