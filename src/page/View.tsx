import { useNavigate } from 'react-router-dom';
// Toast-UI Viewer 임포트
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/store';
const View = () => {
  const board = useAppSelector((state) => state.board);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <p>{board.title}</p>
        <Viewer initialValue={board.content} />
      </div>
    </>
  );
};

export default View;
