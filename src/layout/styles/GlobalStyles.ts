import { createGlobalStyle, css } from 'styled-components';
import { NanumSquare } from './FontStyles';

const ResetStyles = css`
  * {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
  }
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }
  :root {
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    cursor: default;
    line-height: 1.5;
    overflow-wrap: break-word;
    word-break: break-word;
    tab-size: 4;
  }
  html,
  body {
    height: 100%;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  img {
    vertical-align: top;
  }
  button {
    background: none;
    border: 0;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  ul,
  ol {
    list-style: none;
  }
`;

const DefaultStyles = css`
  :root {
    --x-spacing: 0 2rem;
    --spacing: 2rem;
    --content-width: 1320px;

    --title-1: 3.4rem;
    --title-2: 3rem;
    --title-3: 2.6rem;

    --sub-title-1: 3rem;
    --sub-title-2: 2.6rem;
    --sub-title-3: 2.2rem;

    --text-body-1: 1.6rem;
    --text-body-2: 1.4rem;
    --text-caption: 1.2rem;

    --color-primary: #000;
    --color-secondary: #767676;
    --color-placeholder: #999;
    --color-border: #777;
    --color-error: #ff3838;
  }
  html {
    font-size: 10px;
  }
  body {
    background: #fff;
    color: #000;
    font:
      400 1.6rem/1.5 'NanumSquare',
      sans-serif;
  }
`;

const GlobalStyles = createGlobalStyle`
  ${ResetStyles}
  ${NanumSquare}
  ${DefaultStyles}
`;

export default GlobalStyles;
