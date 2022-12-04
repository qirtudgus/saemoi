import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import theme from '../layout/theme';
import 'swiper/css/bundle';
import customAxios from '../util/customAxios';
import { returnTodayString } from '../util/returnTodayString';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';

import 등록하기 from '../img/post_add_white_24dp.svg';

const BtnList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
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

const BtnLabel = styled.label`
  cursor: pointer;
  width: auto;

  padding: 10px;

  flex-shrink: 0;
  text-align: center;
  border: 2px solid#929292;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-right: 10px;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.main};
  }
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
  margin-bottom: 10px;
  user-select: none;
  width: 100%;
`;

const ContentLabel = styled.label`
  margin-bottom: 10px;
  display: block;
`;

const TitleInput = styled.input`
  width: 100%;
  max-width: 573px;
  padding: 10px;
  border: 1px solid#dadde6;
`;

const MultiInputWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 2em;
  padding: 15px 0;
  display: block;
  font-weight: bold;
  word-break: keep-all;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.8em;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.6em;
  }
`;

interface ButtonInterface {
  ButtonBG?: string;
  ButtonTextColor?: string;
}

const ButtonWrapMobile = styled.button<ButtonInterface>`
  cursor: pointer;
  width: 100px;
  height: 35px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.main};
  color: #fff;
  display: none;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
  }
  & img {
    max-width: 25px;
  }

  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
  }

  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const ButtonWrap = styled.button<ButtonInterface>`
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

const list = ['어태커', '서포터', '올라운더'];
const difficultyList = ['7성', '6성', '5성', '4성', '3성 이하'];

const property = [
  '노말',
  '불꽃',
  '물',
  '전기',
  '풀',
  '얼음',
  '격투',
  '독',
  '땅',
  '비행',
  '에스퍼',
  '벌레',
  '바위',
  '고스트',
  '드래곤',
  '악',
  '강철',
  '페어리',
];
const RaidWrite = () => {
  const titleRef = useRef() as RefObject<HTMLInputElement>;
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const typeRef = useRef() as RefObject<HTMLInputElement>;
  const etcTextRef = useRef() as RefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const nickname = useAppSelector((state) => state.user.nickname);
  const [code, setCode] = useState('');
  const [positionState, setPositionState] = useState('어태커');
  const [difficultyState, setDifficultyState] = useState('6성');

  const option = ['1턴 도발', '3턴 공격', '디버프 금지', '나이킹팟', '1딜러 3서폿', '특수방어🔻', '방어🔻'];
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
    if (titleRef === null) {
      return;
    } else {
      if (titleRef.current === null) {
        return;
      } else {
        titleRef.current.focus();
      }
    }
  }, []);

  const submit = () => {
    let optionList: any[] = [];
    let a = document.getElementsByName('option') as NodeListOf<HTMLInputElement>;
    a.forEach((i) => {
      if (i.checked === true) {
        optionList.push(i.value);
      }
    });

    if (titleRef.current && nameRef.current && typeRef.current && etcTextRef.current) {
      if (titleRef.current.value.length !== 6) {
        alert('코드는 6자입니다.');
        titleRef.current.focus();
      } else {
        let date = returnTodayString();
        customAxios('post', '/raidboard/list', {
          nickname,
          raidCode: titleRef.current.value,
          monsterName: nameRef.current.value,
          type: typeRef.current.value,
          positionState,
          difficultyState,
          optionList,
          etcText: etcTextRef.current.value,
          date,
        }).then((res) => {
          console.log('완료');
          navigate('/');
        });
      }
    }

    return;
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <BtnWrap>
          <Title>레이드 등록</Title>
          <ButtonWrapMobile onClick={submit}>
            <img
              src={등록하기}
              alt='등록하기'
            />
            등록
          </ButtonWrapMobile>
        </BtnWrap>

        <InputWrap>
          <MultiInputWrap>
            <div>
              <ContentLabel htmlFor='title'>레이드 코드</ContentLabel>
              <TitleInput
                id='title'
                type={'text'}
                ref={titleRef}
                maxLength={6}
                placeholder='레이드 코드'
                value={code}
                onChange={(e) => {
                  //자동으로 대문자로 변경
                  setCode(e.target.value.toUpperCase());
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    titleRef.current!.value.length > 0 ? nameRefFocus() : console.log('땡');
                  }
                }}
              ></TitleInput>
            </div>
            <div>
              <ContentLabel htmlFor='title'>몬스터 이름</ContentLabel>
              <TitleInput
                id='title'
                type={'text'}
                ref={nameRef}
                maxLength={8}
                placeholder='몬스터 이름'
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    nameRef.current!.value.length > 0 ? typeRefFocus() : console.log('땡');
                  }
                }}
              ></TitleInput>
            </div>

            <div>
              <ContentLabel htmlFor='title'>타입</ContentLabel>
              <TitleInput
                id='title'
                type={'text'}
                ref={typeRef}
                placeholder='타입'
                maxLength={3}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    typeRef.current!.value.length > 0 ? console.log('엔터') : console.log('땡');
                  }
                }}
              ></TitleInput>
            </div>
          </MultiInputWrap>
        </InputWrap>

        <InputWrap>
          <ContentLabel>자신의 포지션을 선택해주세요. - 선택</ContentLabel>
          <BtnList>
            {list.map((i, index) => {
              return (
                <React.Fragment key={i}>
                  <BtnRadio
                    id={i}
                    name='position'
                    onChange={() => {
                      setPositionState(i);
                    }}
                    type={'radio'}
                    value={i}
                    checked={i === positionState}
                  ></BtnRadio>
                  <BtnLabel htmlFor={i}> {i}</BtnLabel>
                </React.Fragment>
              );
            })}
          </BtnList>
        </InputWrap>

        <InputWrap>
          <ContentLabel>난이도를 선택해주세요. - 필수</ContentLabel>
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
                  <BtnLabel htmlFor={i.toString()}> {i}</BtnLabel>
                </React.Fragment>
              );
            })}
          </BtnList>
        </InputWrap>

        <InputWrap>
          <ContentLabel>필요한 태그를 선택해주세요. - 다중 선택 가능</ContentLabel>
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
                  <BtnLabel htmlFor={i.toString()}> {i}</BtnLabel>
                </React.Fragment>
              );
            })}
          </BtnList>
        </InputWrap>

        <InputWrap>
          <ContentLabel htmlFor='etcText'>하고싶은 말 - 선택</ContentLabel>
          <TitleInput
            id='etcText'
            type={'text'}
            ref={etcTextRef}
            placeholder='하고싶은 말'
          ></TitleInput>
        </InputWrap>
      </>
      <BtnWrap>
        <ButtonWrap onClick={submit}>
          <img
            src={등록하기}
            alt='등록하기'
          />
          등록
        </ButtonWrap>
      </BtnWrap>
    </ThemeProvider>
  );
};

export default RaidWrite;
