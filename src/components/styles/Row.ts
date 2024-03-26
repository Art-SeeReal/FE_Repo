import styled from 'styled-components';

interface Props {
  $gap?: number | string;
  $justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
}

export const Row = styled.div<Props>`
  display: flex;
  ${({ $gap }) => {
    if (typeof $gap === 'number') {
      return `gap: ${$gap}px;`;
    }

    if (typeof $gap === 'string') {
      return `gap: ${$gap};`;
    }

    return null;
  }}

  ${({ $justifyContent }) => $justifyContent && `justify-content: ${$justifyContent};`}
`;
