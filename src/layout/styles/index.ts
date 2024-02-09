import { createGlobalStyle } from 'styled-components';
import ResetStyles from './ResetStyles';
import DefaultStyles from './DefaultStyles';
import { NanumSquare } from './FontStyles';
import UtilStyles from './UtilStyles';

const GlobalStyles = createGlobalStyle`
  ${ResetStyles}
  ${NanumSquare}
  ${DefaultStyles}
  ${UtilStyles}
`;

export default GlobalStyles;
