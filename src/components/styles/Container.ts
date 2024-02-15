import styeld from 'styled-components';

interface Props {
  $paddingTop?: boolean | string;
  $paddingBottom?: boolean | string;
}

export const Container = styeld.div<Props>`
    max-width: var(--content-width);
    margin: 0 auto;
    ${({ $paddingTop }) => {
      if (typeof $paddingTop === 'boolean') {
        return `padding-top: 8rem`;
      }

      if (typeof $paddingTop === 'string') {
        return `padding-top: ${$paddingTop}`;
      }

      return null;
    }};


    ${({ $paddingBottom }) => {
      if (typeof $paddingBottom === 'boolean') {
        return `padding-bottom: 16rem`;
      }

      if (typeof $paddingBottom === 'string') {
        return `padding-bottom: ${$paddingBottom}`;
      }

      return null;
    }};
`;
