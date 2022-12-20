import styled from 'styled-components';
import { returnDiffTime } from '../util/returnTodayString';
import { useNavigate } from 'react-router';
import add_like from '../img/thumb_up_white_24dp.svg';
import comment_img from '../img/commentLine_img_white.svg';

const BoardLi = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 15px 10px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  width: 100%;
  justify-content: space-around;

  & .title > span:hover {
    font-weight: bold;
  }

  & .title {
    width: 90%;
    padding: 10px 0;
    display: flex;
    align-items: center;
  }
  & .title > span {
    font-size: 1.1em;
    display: block;
    height: 20px;
    cursor: pointer;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media ${({ theme }) => theme.device.tablet} {
    & .title > span {
      width: 100%;
    }
    & .title {
      width: 100%;
    }
  }

  & .topInfo {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9em;
  }

  & .frontInfo {
    display: flex;
    align-items: center;
  }

  & .nickname {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .secondInfo {
    display: flex;
    align-items: center;
  }
  & .date {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & .comment {
    display: flex;
    align-items: center;
  }
  & .like {
    display: flex;
    align-items: center;
  }
  & .comment img {
    width: 20px;
  }
  & .like img {
    width: 20px;
  }
  & .comment span {
    margin-left: 5px;
  }
  & .like span {
    margin-left: 5px;
  }

  & .line {
    display: inline-block;
    border-left: 1px solid ${({ theme }) => theme.colors.borderColor};
    margin: 0 10px;
    height: 15px;
  }
`;

const WriteSearchWrap = styled.div`
  display: flex;
  & button {
    flex-shrink: 0;
  }
`;

const WriteButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  & h1 {
    flex-shrink: 0;
  }
`;

const SearchInputWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 3px 3px 8px;
  border: 1px solid#dadde6;
  border-radius: 10px;
  height: 40px;
  margin-left: 10px;
  & input {
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0 0 2px 3px;
    width: 100%;
  }
  & input:focus-visible {
    outline: 0px;
  }
`;

const BoardList = (props: {
  index: string;
  title: string;
  nickname: string;
  date: string;
  commentCount: string;
  likes: string;
}) => {
  const navigate = useNavigate();

  return (
    <BoardLi>
      <div className='topInfo'>
        <div className='frontInfo'>
          <span className='nickname'>{props.nickname}</span>
          <div className='line'></div>
          <span className='date'>{returnDiffTime(props.date)}</span>
        </div>
        <div className='secondInfo'>
          <div className='comment'>
            <img
              src={comment_img}
              alt='댓글'
            />
            <span>{props.commentCount}</span>
          </div>
          <div className='line'></div>
          <div className='like'>
            <img
              src={add_like}
              alt='좋아요'
            />
            <span>{props.likes}</span>
          </div>
        </div>
      </div>
      <p className='title'>
        <span
          onClick={() => {
            //여기서 디스패치해서 제목과 콘텐츠를 가져와야할듯?
            //해당 페이지에서 새로고침 시 값을 가져오질못함..해당컴포넌트에서 useEffect를 이용해야 새로고침에도 데이터 획득가능
            // dispatch(BoardViewService.getBoard({ number: i.index }))
            // customAxios('put', `/board/view?number=${props.index}`);
            navigate(`/board/posts/${props.index}`);
          }}
        >
          {props.title}
        </span>
      </p>
    </BoardLi>
  );
};

export default BoardList;
