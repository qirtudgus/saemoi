//참고사이트
// https://wonit.tistory.com/366

// 반응형 디자인을 위한 픽셀 컨버팅 함수
const pixelToRem = (size: number) => `${size / 16}rem`;

// font size를 객체로 반환해주자.
const fontSizes = {
  title: pixelToRem(60),
  subtitle: pixelToRem(30),
  paragraph: pixelToRem(18),
};

// 자주 사용하는 색을 객체로 만들자.
const colors = {
  main: '#ef5a34',
  // main: '#48b651',
  // main: '#3e55ff',
  borderColor: '#5c5c5c',
  black: '#000000',
  grey: '#999999',
  green: '#3cb46e',
  blue: '#000080',
};

// 자주 사용하는 스타일 속성을 theme으로 만들어보자.
const common = {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};

const deviceSizes = {
  mobile: '375px',
  tablet: '768px',
  laptop: '1024px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

interface ThemeInterface {
  fontSizes: any;
  colors: any;
  common: any;
  device: any;
}

// theme 객체에 감싸서 반환한다.
const theme: ThemeInterface = {
  fontSizes,
  colors,
  common,
  device,
};

export default theme;
