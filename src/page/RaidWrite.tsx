import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import theme from '../layout/theme';
import 'swiper/css/bundle';
import customAxios from '../util/customAxios';
import { returnTodayString } from '../util/returnTodayString';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import 등록하기 from '../img/post_add_white_24dp.svg';
import 뒤로가기 from '../img/뒤로가기.svg';
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

const BtnLabel = styled.label`
  cursor: pointer;
  width: auto;

  padding: 10px;

  flex-shrink: 0;
  text-align: center;
  border: 2px solid#929292;
  border-radius: 10px;
  /* margin-bottom: 10px; */
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
const difficultyList = ['7성', '6성', '5성', '4성', '3성↓'];

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

const HeaderWrap = styled.header`
  position: sticky;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background: #35363a;
  z-index: 100;
  border-bottom: 1px solid #e5e7eb;
  box-sizing: border-box;
  ${({ theme }) => theme.common.flexCenter};
  margin-bottom: 50px;
`;
const HeaderDiv = styled.div`
  max-width: 1280px;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackBtn = styled.button`
  background: none;
`;

const TitleOrBackWrap = styled.div`
  display: flex;
  & img {
    cursor: pointer;
    margin-right: 5px;
  }
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
    if (codeRef === null) {
      return;
    } else {
      if (codeRef.current === null) {
        return;
      } else {
        codeRef.current.focus();
      }
    }
  }, []);

  const submit = () => {
    let optionList: any[] = [];
    let a = document.getElementsByName('option') as NodeListOf<HTMLInputElement>;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    a.forEach((i) => {
      if (i.checked === true) {
        optionList.push(i.value);
      }
    });

    if (codeRef.current && nameRef.current && typeRef.current && etcTextRef.current) {
      if (codeRef.current.value.length !== 6) {
        alert('코드는 6자입니다.');
        codeRef.current.focus();
      } else if (korean.test(codeRef.current.value)) {
        alert('코드는 영문과 숫자로 이루어져있습니다.');
        codeRef.current.focus();
      } else if (nameRef.current.value === '' && nameRef.current.value.length === 0) {
        alert('포켓몬의 이름을 입력해주세요.');
        nameRef.current.focus();
      } else if (typeRef.current.value === '' && typeRef.current.value.length === 0) {
        alert('포켓몬의 타입을 입력해주세요.');
        typeRef.current.focus();
      } else {
        let date = returnTodayString();
        customAxios('post', '/raidboard/list', {
          nickname,
          raidCode: codeRef.current.value,
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
        <HeaderWrap>
          <HeaderDiv>
            <TitleOrBackWrap>
              <BackBtn
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
        {/* <BtnWrap>
          <Title>레이드 등록</Title>
          <ButtonWrapMobile onClick={submit}>
            <img
              src={등록하기}
              alt='등록하기'
            />
            등록
          </ButtonWrapMobile>
        </BtnWrap> */}

        <InputWrap>
          <MultiInputWrap>
            <div>
              <ContentLabel htmlFor='title'>레이드 코드</ContentLabel>
              <TitleInput
                id='title'
                type={'text'}
                ref={codeRef}
                maxLength={6}
                placeholder='레이드 코드'
                value={code}
                onKeyUp={(e) => {
                  console.log(e.currentTarget!.value);
                }}
                onChange={(e) => {
                  //자동으로 대문자로 변경
                  // let trans = translate(e.target.value) as string;
                  if (e.target.value.length >= 6) {
                    nameRefFocus();
                  }
                  setCode(e.target.value.toUpperCase());
                }}
                // onKeyDown={(e) => {
                //   if (e.keyCode === 13) {
                //     codeRef.current!.value.length > 0 ? nameRefFocus() : console.log('땡');
                //   }
                // }}
              ></TitleInput>
            </div>
            <div>
              <ContentLabel htmlFor='title'>포켓몬 이름</ContentLabel>
              <TitleInput
                id='title'
                type={'text'}
                ref={nameRef}
                maxLength={8}
                placeholder='포켓몬 이름'
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

        {/* <InputWrap>
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
        </InputWrap> */}

        <InputWrap>
          <ContentLabel>난이도를 선택해주세요.</ContentLabel>
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
          <ContentLabel htmlFor='etcText'>기타 전달사항 - 선택 사항</ContentLabel>
          <TitleInput
            id='etcText'
            type={'text'}
            ref={etcTextRef}
            placeholder='ex)방장 블래키...등'
          ></TitleInput>
        </InputWrap>
        <InputWrap>
          <ContentLabel>필요한 태그를 선택해주세요. - 선택 사항(다중 선택 가능)</ContentLabel>
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
                  <BtnRaidOptionLabel htmlFor={i.toString()}> {i}</BtnRaidOptionLabel>
                </React.Fragment>
              );
            })}
          </BtnList>
        </InputWrap>
      </>
      <BtnWrap>
        <ButtonWrap onClick={submit}>
          <img
            src={등록하기}
            alt='등록하기'
          />
          완료
        </ButtonWrap>
      </BtnWrap>
    </ThemeProvider>
  );
};

export default RaidWrite;
