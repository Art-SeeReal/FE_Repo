import styeld from 'styled-components';

interface Props {
  $paddingTop?: boolean | string;
  $paddingBottom?: boolean | string;
  $width?: number;
}

export const Container = styeld.div<Props>`
    margin: 0 auto;

    max-width: ${({ $width }) => {
      if ($width) {
        return `${$width}px;`;
      }
      return `var(--content-width);`;
    }}

    ${({ $paddingTop }) => {
      if ($paddingTop === true) {
        return `padding-top: 8rem`;
      }

      if (typeof $paddingTop === 'string') {
        return `padding-top: ${$paddingTop}`;
      }

      return null;
    }};


    ${({ $paddingBottom }) => {
      if ($paddingBottom === true) {
        return `padding-bottom: 16rem`;
      }

      if (typeof $paddingBottom === 'string') {
        return `padding-bottom: ${$paddingBottom}`;
      }

      return null;
    }};
`;
