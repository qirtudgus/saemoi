import { motion } from 'framer-motion';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { socket } from '../App'; //이런식으로 가져와서 소켓 중복안되도록 구현
import 등록하기 from '../img/post_add_white_24dp.svg';
import 뒤로가기 from '../img/뒤로가기.svg';
import { useAppSelector } from '../store/store';
import { returnTodayString, returnTodayString180s } from '../util/returnTodayString';
import { SubmitTitle, Title } from './Board';

const BtnList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  /* margin: 10px 0; */
`;

const PropertyLabel = styled.label`
  cursor: pointer;
  width: auto;
  padding: 10px;
  margin-right: 15px;
  margin-bottom: 10px;
  flex-shrink: 0;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors.main};
  border-radius: 10px;
`;

const BtnLabel = styled(motion.label)`
  cursor: pointer;
  width: auto;

  padding: 10px;

  flex-shrink: 0;
  text-align: center;
  border: 2px solid#929292;
  border-radius: 10px;
  margin-right: 10px;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.main};
  }
`;

const BtnRaidOptionLabel = styled(BtnLabel)`
  margin-bottom: 10px;
`;

const BtnRadio = styled.input`
  display: none;

  &:checked + ${BtnLabel} {
    background: ${({ theme }) => theme.colors.main};
    border: 2px solid ${({ theme }) => theme.colors.main};
    color: #fff;
  }

  &:checked + ${PropertyLabel} {
    background: ${({ theme }) => theme.colors.main};
    border: 2px solid ${({ theme }) => theme.colors.main};
    color: #fff;
  }
`;

const InputWrap = styled.div`
  margin-bottom: 20px;
  user-select: none;
  width: 100%;
`;

const ContentLabel = styled.label`
  margin-bottom: 10px;
  display: block;
`;

const TitleInput = styled.input`
  width: 100%;
  max-width: 397px;
  padding: 10px;
  border: 1px solid#dadde6;
`;

const MultiInputWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & div:first-child {
    margin-right: 15px;
  }
`;

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

interface ButtonInterface {
  ButtonBG?: string;
  ButtonTextColor?: string;
}

const ButtonWrap = styled(motion.button)<ButtonInterface>`
  cursor: pointer;
  width: 100px;
  height: 35px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.main};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  &:hover {
    opacity: 0.8;
  }
  & img {
    max-width: 25px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const difficultyList = ['7성', '6성', '5성', '4성', '3성↓'];

// 자동완성
// const property = [
//   '노말',
//   '불꽃',
//   '물',
//   '전기',
//   '풀',
//   '얼음',
//   '격투',
//   '독',
//   '땅',
//   '비행',
//   '에스퍼',
//   '벌레',
//   '바위',
//   '고스트',
//   '드래곤',
//   '악',
//   '강철',
//   '페어리',
// ];

const HeaderWrap = styled.header`
  position: sticky;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background: #35363a;
  z-index: 100;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  box-sizing: border-box;
  ${({ theme }) => theme.common.flexCenter};
  margin-bottom: 20px;
`;
const HeaderDiv = styled.div`
  max-width: 1280px;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackBtn = styled(motion.button)`
  background: none;
  display: flex;
  align-items: center;
`;

const TitleOrBackWrap = styled.div`
  display: flex;

  & img {
    cursor: pointer;
    margin-right: 5px;
  }
`;

const HelpText = styled.p`
  margin-bottom: 10px;
`;

const RaidWrite = () => {
  const codeRef = useRef() as RefObject<HTMLInputElement>;
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const typeRef = useRef() as RefObject<HTMLInputElement>;
  const etcTextRef = useRef() as RefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const nickname = useAppSelector((state) => state.user.nickname);
  const [code, setCode] = useState('');
  const [positionState, setPositionState] = useState('어태커');
  const [difficultyState, setDifficultyState] = useState('6성');

  const option = [
    '방장 딜러',
    '방장 서폿',
    '1턴 도발',
    '1턴 스킬스왑',
    '3턴 공격',
    '디버프❌',
    '1딜러 3서폿',
    '방장 초보😥',
    '특수방어🔻',
    '방어🔻',
    '나이킹팟',
    '재도전!',
  ];
  const nameRefFocus = () => {
    if (nameRef === null) {
      return;
    } else {
      if (nameRef.current === null) {
        return;
      } else {
        nameRef.current.focus();
      }
    }
  };

  const etcTextRefFocus = () => {
    if (etcTextRef === null) {
      return;
    } else {
      if (etcTextRef.current === null) {
        return;
      } else {
        etcTextRef.current.focus();
      }
    }
  };

  const typeRefFocus = () => {
    if (typeRef === null) {
      return;
    } else {
      if (typeRef.current === null) {
        return;
      } else {
        typeRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (nameRef === null) {
      return;
    } else {
      if (nameRef.current === null) {
        return;
      } else {
        nameRef.current.focus();
      }
    }
  }, []);

  const submit = () => {
    let optionList: any[] = [];
    let isOptionCheck = document.getElementsByName('option') as NodeListOf<HTMLInputElement>;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    isOptionCheck.forEach((i) => {
      if (i.checked === true) {
        optionList.push(i.value);
      }
    });

    if (codeRef.current && nameRef.current && etcTextRef.current) {
      if (codeRef.current.value.length !== 6) {
        alert('코드는 6자입니다.');
        codeRef.current.focus();
      } else if (korean.test(codeRef.current.value)) {
        alert('코드는 영문과 숫자로 이루어져있습니다.');
        codeRef.current.focus();
      } else if (nameRef.current.value === '' && nameRef.current.value.length === 0) {
        alert('포켓몬의 이름을 입력해주세요.');
        nameRef.current.focus();
      } else {
        let date = returnTodayString();
        let deleteDate = returnTodayString180s();
        console.log(optionList.join(', '));
        console.log(etcTextRef.current.value);
        socket.emit('raidList', {
          nickname,
          raidCode: codeRef.current.value,
          monsterName: nameRef.current.value,
          type: '',
          positionState,
          raidDifficulty: difficultyState,
          optionList: optionList.join(', '),
          etcText: etcTextRef.current.value,
          date,
          deleteDate,
        });
        navigate('/realtimeraidboard');
      }
    }

    return;
  };

  return (
    <>
      <HeaderWrap>
        <HeaderDiv>
          <TitleOrBackWrap>
            <BackBtn
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <img
                src={뒤로가기}
                alt='뒤로가기'
              />
            </BackBtn>

            <Title>레이드 등록</Title>
          </TitleOrBackWrap>
          <SubmitTitle
            as='button'
            onClick={submit}
          >
            완료
          </SubmitTitle>
        </HeaderDiv>
      </HeaderWrap>

      <InputWrap>
        <MultiInputWrap>
          <div>
            <ContentLabel htmlFor='title'>포켓몬명 / 타입</ContentLabel>
            <TitleInput
              id='title'
              type={'text'}
              ref={nameRef}
              maxLength={10}
              placeholder='포켓몬 이름과 타입을 입력'
            ></TitleInput>
          </div>
          <div>
            <ContentLabel htmlFor='title'>레이드 암호 6자</ContentLabel>
            <TitleInput
              id='title'
              type={'text'}
              ref={codeRef}
              maxLength={6}
              placeholder='레이드 암호를 입력'
              value={code}
              onKeyUp={(e) => {
                console.log(e.currentTarget!.value);
              }}
              onChange={(e) => {
                if (e.target.value.length >= 6) {
                  etcTextRefFocus();
                }
                setCode(e.target.value.toUpperCase());
              }}
            ></TitleInput>
          </div>
        </MultiInputWrap>
      </InputWrap>

      <InputWrap>
        <ContentLabel htmlFor='etcText'>전달 사항 최대 20자 - 선택</ContentLabel>
        <TitleInput
          id='etcText'
          type={'text'}
          ref={etcTextRef}
          maxLength={20}
          placeholder='ex)방장 블래키...등'
        ></TitleInput>
      </InputWrap>

      <InputWrap>
        <ContentLabel>난이도를 선택해주세요. (기본 6성 선택)</ContentLabel>
        <BtnList>
          {difficultyList.map((i, index) => {
            return (
              <React.Fragment key={i}>
                <BtnRadio
                  id={i.toString()}
                  name='difficulty'
                  onChange={() => {
                    setDifficultyState(i);
                  }}
                  type={'radio'}
                  value={i}
                  checked={i === difficultyState}
                ></BtnRadio>
                <BtnLabel
                  whileTap={{ scale: 0.95 }}
                  htmlFor={i.toString()}
                >
                  {' '}
                  {i}
                </BtnLabel>
              </React.Fragment>
            );
          })}
        </BtnList>
      </InputWrap>

      <InputWrap>
        <ContentLabel>필요한 태그를 선택해주세요. - 선택 (다중 선택 가능)</ContentLabel>
        <BtnList>
          {option.map((i, index) => {
            return (
              <React.Fragment key={index}>
                <BtnRadio
                  id={i.toString()}
                  name='option'
                  type={'checkBox'}
                  defaultValue={i}
                  // value={i}
                ></BtnRadio>
                <BtnRaidOptionLabel
                  whileTap={{ scale: 0.95 }}
                  htmlFor={i.toString()}
                >
                  {' '}
                  {i}
                </BtnRaidOptionLabel>
              </React.Fragment>
            );
          })}
        </BtnList>
      </InputWrap>

      <BtnWrap>
        <ButtonWrap
          whileTap={{ scale: 0.95 }}
          onClick={submit}
        >
          <img
            src={등록하기}
            alt='등록하기'
          />
          완료
        </ButtonWrap>
      </BtnWrap>

      <HelpText>*레이드 코드에는 소문자 입력 시에도 자동으로 대문자로 변환됩니다.</HelpText>
      <HelpText>*전달 사항에는 파티원들이 알았으면 하는 내용을 적고, 아예 적지 않아도 됩니다.</HelpText>
      <HelpText>*태그는 쓰고 싶은 용어를 눌러놓으면 리스트에 표시됩니다.</HelpText>
    </>
  );
};

export default RaidWrite;
