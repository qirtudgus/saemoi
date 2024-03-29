import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { RefObject, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BasicButton, SolidButton } from '../components/BtnGroup';
import { useAppSelector } from '../store/store';
import customAxios from '../util/customAxios';
import { returnTodayString } from '../util/returnTodayString';
import { Title } from './Board';
const InputWrap = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const ContentLabel = styled.label`
  margin-bottom: 15px;
  display: block;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid#dadde6;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Write = () => {
  const navigate = useNavigate();
  const nickname = useAppSelector((state) => state.user.nickname);
  const id = useAppSelector((state) => state.user.id);
  const editorRef = useRef() as RefObject<Editor>;
  const titleRef = useRef() as RefObject<HTMLInputElement>;

  // 등록 버튼 핸들러
  const handleRegisterButton = () => {
    let date = returnTodayString();
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    console.log(editorRef!.current!.getInstance().getHTML());
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
    console.log(editorRef!.current!.getInstance().getMarkdown());

    console.log(titleRef!.current!.value);

    let title = titleRef!.current!.value;
    if (title === '') {
      alert('제목을 입력해주세요!');
      titleRef!.current!.focus();
      return;
    } else {
      let content = editorRef!.current!.getInstance().getHTML();
      customAxios('post', '/board', { title, content, date, nickname, id }).then((res) => {
        console.log(res.data);
        console.log(res.status);
        if (res.status === 200) {
          navigate('/board/list');
        }
      });
    }
  };

  useEffect(() => {
    titleRef.current?.focus();
  }, []);
  useEffect(() => {
    // 이미지 업로드 막기
    if (editorRef.current !== null) {
      editorRef.current.getInstance().removeHook('addImageBlobHook');
    }
  }, []);

  return (
    <>
      <div>
        <Title>게시글 작성</Title>
        <InputWrap>
          <ContentLabel htmlFor='title'>제목</ContentLabel>
          <TitleInput
            id='title'
            type={'text'}
            ref={titleRef}
            placeholder='제목을 입력해주세요.'
          ></TitleInput>
        </InputWrap>
        <InputWrap>
          <ContentLabel>내용</ContentLabel>
          <Editor
            ref={editorRef} // DOM 선택용 useRef
            placeholder='내용을 입력해주세요.'
            previewStyle='vertical' // 미리보기 스타일 지정
            height='350px' // 에디터 창 높이
            initialEditType='wysiwyg' // 초기 입력모드 설정(디폴트 markdown)
            hideModeSwitch={true}
            autofocus={false}
            language='ko-KR'
            toolbarItems={[
              // 툴바 옵션 설정
              // ['image', 'link'],
              ['bold', 'strike', 'italic'],
            ]}
          ></Editor>
        </InputWrap>
      </div>
      <ButtonWrap>
        <BasicButton
          OnClick={() => {
            navigate(-1);
          }}
        >
          취소
        </BasicButton>
        <SolidButton
          ClassName={'ml_10'}
          OnClick={() => {
            if (window.confirm('게시글을 등록하시겠습니까?')) {
              handleRegisterButton();
            }
          }}
        >
          등록
        </SolidButton>
      </ButtonWrap>
    </>
  );
};

export default Write;
