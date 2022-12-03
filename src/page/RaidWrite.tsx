import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import theme from '../layout/theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Scrollbar } from 'swiper';
import 'swiper/css/bundle';
import TitleText from '../components/TitleText';
import { SolidButton } from '../components/BtnGroup';
import customAxios from '../util/customAxios';
import { returnTodayString } from '../util/returnTodayString';
import { useAppSelector } from '../store/store';

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
  min-width: 90px;
  padding: 10px;

  flex-shrink: 0;
  text-align: center;
  border: 2px solid#ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-right: 10px;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.main};
  }

  &:active {
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
  max-width: 400px;
  padding: 10px;
  border: 1px solid#dadde6;
`;

const MultiInputWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
      });
    }

    return;
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <TitleText text={'레이드 작성'}></TitleText>

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
                maxLength={9}
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
                maxLength={4}
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
                    onChange={(e) => {
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
                    onChange={(e) => {
                      console.log('하하');
                      console.log(e.target.value);
                    }}
                    type={'checkBox'}
                    value={i}
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

        <SolidButton OnClick={submit}>등록</SolidButton>
      </>
    </ThemeProvider>
  );
};

export default RaidWrite;
