import { useNavigate, useParams } from 'react-router-dom';
// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import customAxios from '../util/customAxios';
const View = () => {
  const navigate = useNavigate();
  let { number } = useParams();
  interface BoardInterface {
    title: string;
    content: string;
    date: string;
    nickname: string;
  }
  const [content, setContent] = useState<BoardInterface>({
    title: '',
    content: '',
    date: '',
    nickname: '',
  });

  useEffect(() => {
    customAxios('get', `/board/view?number=${number}`, {}).then((res) => {
      console.log(res.data);
      setContent(res.data);
    });
  }, [number]);

  return (
    <>
      <div>
        <p>{content.date}</p>
        <p>{content.nickname}</p>
        <p>{content.title}</p>
        {content.title === '' ? null : <Viewer initialValue={content.content} />}
      </div>
    </>
  );
};

export default View;
