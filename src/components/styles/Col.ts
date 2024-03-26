import styled from 'styled-components';

interface Props {
  $col?: number;
}

const max = 12;

export const Col = styled.div<Props>`
  flex: ${({ $col }) => {
    return $col ? `0 0 calc(100% / (${max} / ${$col}))` : 1;
  }};
`;
