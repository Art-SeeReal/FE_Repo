import styled from 'styled-components';

interface Props {
  $col?: number;
  $auto?: boolean;
}

const max = 12;

export const Col = styled.div<Props>`
  ${({ $auto, $col }) => {
    if ($auto) return null;

    if ($col) {
      return `flex: 0 0 calc(100% / (${max} / ${$col}));`;
    }

    return `flex: 1;`;
  }};
`;
