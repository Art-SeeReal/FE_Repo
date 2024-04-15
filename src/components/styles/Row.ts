import styled from 'styled-components';

interface Props {
  $gap?: number | string;
  $justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  $alignItems?: 'flex-start' | 'flex-end' | 'center';
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
  ${({ $alignItems }) => $alignItems && `align-items: ${$alignItems};`}
`;
