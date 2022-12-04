import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'; // style-reset 패키지

const GlobalStyles = createGlobalStyle` 
    ${reset}

    html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
button,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

    a{
      color:#fff;
        text-decoration: none;
    }
    *{
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        box-sizing: border-box;
    }
    body {  line-height: 1;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 14px;
        background-color:#35363a;
        color: #fff;
    }
    //토스트에디터 팝업창 위치 조정
    @media only screen and (max-width: 480px) {
  .toastui-editor-popup {
    position: absolute;
    max-width: 300px;
    margin-left: 0px !important;
  }
}
  //토스트에디터 텍스트뷰어 텍스트 마진 조절
  .toastui-editor-contents p,
.toastui-editor-contents h1,
.toastui-editor-contents h2,
.toastui-editor-contents h3,
.toastui-editor-contents h4,
.toastui-editor-contents h5,
.toastui-editor-contents h6 {
  margin: 0px !important;
}

//토스트 에디터 뷰어 폰트사이즈 조절
.toastui-editor-contents p {
  font-size: 15px;
}
`;

export default GlobalStyles;
