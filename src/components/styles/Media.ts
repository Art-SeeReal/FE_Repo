import { CSSProp, css } from 'styled-components';

type MediaQueryProps = {
  mobile: number;
  tablet: number;
  desktop: number;
};

const sizes: MediaQueryProps = {
  mobile: 750,
  tablet: 1080,
  desktop: 1920,
};

export const Media = {
  mobile: (literals: TemplateStringsArray, ...args: string[]): CSSProp => css`
    @media only screen and (max-width: ${sizes.mobile}px) {
      ${css(literals, ...args)}
    }
  `,
  tablet: (literals: TemplateStringsArray, ...args: string[]): CSSProp => css`
    @media only screen and (max-width: ${sizes.tablet}px) {
      ${css(literals, ...args)}
    }
  `,
  desktop: (literals: TemplateStringsArray, ...args: string[]): CSSProp => css`
    @media only screen and (max-width: ${sizes.desktop}px) {
      ${css(literals, ...args)}
    }
  `,
};
