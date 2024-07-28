import { css } from '@emotion/react';

const baseStyle = css`
  /* styles/reset.css */
  /* 최신 reset CSS 코드 (예: Eric Meyer's Reset CSS) */
  /* http://meyerweb.com/eric/tools/css/reset/ 
     v2.0 | 20110126
     License: none (public domain)
  */

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
    font: inherit;
    vertical-align: baseline;
  }

  html {
    background: #F7F5F1;
    font-size: 16px;
    height: 100%;
    position: relative;
  }

  body {
    height: 100%;
  }

  div#__next {
    height: 100%;
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

  body {
    line-height: 1;
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
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 선택자 초기화 */

  * {
    box-sizing: border-box;
    text-decoration: none;
  }

  button {
    border: none;
    cursor: pointer;
    font: inherit;
    background: none;
    padding: 0;
    white-space: nowrap;
  }

  p {
    line-height: 1.5;
  }

  input {
    font-family: 'Pretendard-Regular', sans-serif;
  }

  :root {
    /* Primary Colors */
    --main-red-0: #ffffff;
    --main-red-50: #ffedea;
    --main-red-100: #fcdcd7;
    --main-red-200: #fab9b1;
    --main-red-300: #f69888;
    --main-red-400: #f47460;
    --main-red-500: #f15139;
    --main-red-600: #c2412e;
    --main-red-700: #913121;
    --main-red-800: #612017;
    --main-red-900: #30100a;

    /* Second Colors */
    --second-yellow: #ffd223;
    --second-sky: #8ccaff;
    --second-green: #73e390;
    --second-pink: #ff91b9;
    --second-purple: #c7a5ff;

    /* Grayscale */
    --grey-0: #ffffff;
    --grey-50: #fafafa;
    --grey-100: #f2f2f2;
    --grey-200: #e6e6e6;
    --grey-300: #d4d4d4;
    --grey-400: #b3b3b3;
    --grey-500: #949494;
    --grey-600: #757575;
    --grey-700: #525252;
    --grey-800: #333333;
    --grey-900: #171717;

    /* Status Colors */
    --success: #56bc44;
    --danger: #e43333;
    --warning: #f1b419;
    --info: #129eed;

    /* Background Colors */
    --bg-default: #f7f5f1;
    --bg-surface: #ffffff;

    /* font-family 가변 weight  */
    font-family: 'Pretendard GOV Variable';
  }

  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -24px; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 24px;
  }
`;


export default baseStyle;
