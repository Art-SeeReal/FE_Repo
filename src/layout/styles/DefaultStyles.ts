import { css } from 'styled-components';

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
    --color-border-1: #777;
    --color-border-2: #ccc;
    --color-success: #2ecc71;
    --color-error: #ff3838;
    --color-info: #747d8c;
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

export default DefaultStyles;
