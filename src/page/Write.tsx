import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { RefObject, useRef } from 'react';
import customAxios from '../util/customAxios';
import { useNavigate } from 'react-router-dom';
import '@toast-ui/editor/dist/i18n/ko-kr';

const Write = () => {
  const navigate = useNavigate();
  const editorRef = useRef() as RefObject<Editor>;
  const titleRef = useRef() as RefObject<HTMLInputElement>;
  // 등록 버튼 핸들러
  const handleRegisterButton = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    console.log(editorRef!.current!.getInstance().getHTML());
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
    console.log(editorRef!.current!.getInstance().getMarkdown());

    console.log(titleRef!.current!.value);
    let title = titleRef!.current!.value;
    let content = editorRef!.current!.getInstance().getHTML();
    customAxios('post', '/board', { title, content }).then((res) => {
      console.log(res.data);
      console.log(res.status);
      if (res.status === 200) {
        alert('게시물이 등록되었습니다!');
        navigate('/board');
      }
    });
  };

  return (
    <>
      <div>
        <h3>### Editor Toast</h3>
        <input ref={titleRef}></input>
        <Editor
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
      </div>
      <button onClick={handleRegisterButton}>등록</button>
    </>
  );
};

export default Write;
