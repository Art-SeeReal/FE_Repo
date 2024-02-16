import styled from 'styled-components';
import { ReactNode } from 'react';

const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

const STYLES = {
  primary: 'primary',
  secondary: 'secondary',
  border: 'border',
  link: 'link',
  linkWhite: 'linkWhite',
} as const;

type SIZES = (typeof SIZES)[keyof typeof SIZES];
type STYLES = (typeof STYLES)[keyof typeof STYLES];

export interface Props {
  children: ReactNode;
  $size?: SIZES;
  $style?: STYLES;
  $block?: boolean;
  disabled?: boolean;
}

export const Button = styled.button<Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
  border-radius: 0.8rem;
  line-height: 1;

  ${({ disabled }) =>
    disabled &&
    `
      opacity: .5;
      cursor: no-drop;
  `};

  ${({ $size }) => {
    if ($size === SIZES.small)
      return `
        max-width: 10rem;
        font-size: var(--text-body-2);
      `;
    if ($size === SIZES.medium)
      return `
        max-width: 16rem;
        font-size: var(--text-body-1);
      `;
    if ($size === SIZES.large)
      return `
        max-width: 20rem;
        font-size: var(--sub-title-3);
      `;

    return null;
  }};

  ${({ $block }) => $block && `max-width: none`};

  ${({ $style }) => {
    if ($style === STYLES.primary)
      return `
        color: #fff;
        background-image: linear-gradient(120deg, #fa9ee9, #b87eea 70%, #81fee9);
        background-size: 200% auto;
        transition: background 0.4s ease;

        &:hover {
          background-position: right center;
        }
      `;

    if ($style === STYLES.secondary)
      return `
        color: #fff;
        background: rgba(0, 0, 0);
        transition: background 0.4s ease;

        &:hover {
          background: rgba(0, 0, 0, .8);
        }
      `;

    if ($style === STYLES.border)
      return `
        color: #000;
        border: 2px solid transparent;
        background-image: linear-gradient(#fff, #fff), linear-gradient(120deg, #fa9ee9, #b87eea 70%, #81fee9);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        background-size: 200% auto;
        transition: background 0.4s ease;

        &:hover {
          background-position: right center;
        }
    `;

    if ($style === STYLES.link)
      return `
        width: auto;
        max-width: none;
        color: #000;
        transition: background 0.4s ease;

        &:hover {
          background: rgba(0, 0, 0, .1);
        }
      `;

    if ($style === STYLES.linkWhite)
      return `
        width: auto;
        max-width: none;
        color: #fff;
        transition: background 0.4s ease;

        &:hover {
          background: rgba(255, 255, 255, .1);
        }
      `;

    return null;
  }};
`;

export const defaultProps = {
  $size: SIZES.medium,
  $style: STYLES.primary,
};

Button.defaultProps = defaultProps;
