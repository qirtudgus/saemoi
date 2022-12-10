import { useNavigate, useParams } from 'react-router-dom';
// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { RefObject, useEffect, useRef, useState } from 'react';
import customAxios from '../util/customAxios';
import { useAppSelector } from '../store/store';
import { Editor } from '@toast-ui/react-editor';
import { returnTodayString } from '../util/returnTodayString';
import styled from 'styled-components';
import { BasicButton, SolidButton } from '../components/BtnGroup';
import { Title } from './Board';

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

const ContentLabel = styled.label`
  margin-bottom: 15px;
  display: block;
`;
const InputWrap = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

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
    let latestEditDate = returnTodayString();
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
        <Title>게시글 수정</Title>
        <InputWrap>
          <ContentLabel htmlFor='title'>제목</ContentLabel>
          <TitleInput ref={titleRef}></TitleInput>
        </InputWrap>
        <InputWrap>
          <ContentLabel>내용</ContentLabel>
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
              toolbarItems={
                [
                  // 툴바 옵션 설정
                  // ['image', 'link'],
                ]
              }
            ></Editor>
          )}{' '}
        </InputWrap>
      </div>
      {content.id === id ? (
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
              if (window.confirm('게시글을 수정하시겠습니까?')) {
                handleRegisterButton();
              }
            }}
          >
            수정
          </SolidButton>
        </ButtonWrap>
      ) : null}
    </>
  );
};

export default PostEdit;
