import { css } from 'styled-components';

import NanumSquareBWoff2 from '../../assets/fonts/NanumSquareB.woff2';
import NanumSquareBWoff from '../../assets/fonts/NanumSquareB.woff';
import NanumSquareRWoff2 from '../../assets/fonts/NanumSquareR.woff2';
import NanumSquareRWoff from '../../assets/fonts/NanumSquareR.woff';
import NanumSquareLWoff2 from '../../assets/fonts/NanumSquareL.woff2';
import NanumSquareLWoff from '../../assets/fonts/NanumSquareL.woff';

export const NanumSquare = css`
  @font-face {
    font-family: 'NanumSquare';
    font-weight: 700;
    src:
      local('NanumSquareBold'),
      url('${NanumSquareBWoff2}') format('woff2'),
      url('${NanumSquareBWoff}') format('woff');
  }

  @font-face {
    font-family: 'NanumSquare';
    font-weight: 400;
    src:
      local('NanumSquareRegular'),
      url('${NanumSquareRWoff2}') format('woff2'),
      url('${NanumSquareRWoff}') format('woff');
  }

  @font-face {
    font-family: 'NanumSquare';
    font-weight: 300;
    src:
      local('NanumSquareLight'),
      url('${NanumSquareLWoff2}') format('woff2'),
      url('${NanumSquareLWoff}') format('woff');
  }
`;
