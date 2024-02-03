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
};

type SIZES = (typeof SIZES)[keyof typeof SIZES];
type STYLES = (typeof STYLES)[keyof typeof STYLES];

interface Props {
  children: ReactNode;
  $size?: SIZES;
  $style?: STYLES;
  $block?: boolean;
  disabled?: boolean;
}

const Button = styled.button<Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75em 1em;
  border-radius: 0.8rem;
  color: #fff;

  ${({ disabled }) =>
    disabled &&
    `
      opacity: .5;
      cursor: no-drop;
  `};

  ${({ $block }) => $block && `max-width: none`};

  ${({ $size }) => {
    if ($size === SIZES.small)
      return `
        max-width: 10rem;
        font-$size: var(--text-caption);
      `;
    if ($size === SIZES.medium)
      return `
        max-width: 16rem;
        font-$size: var(--text-body);
      `;
    if ($size === SIZES.large)
      return `
        max-width: 20rem;
        font-$size: var(--sub-title-3);
      `;

    return null;
  }};

  ${({ $style }) => {
    if ($style === STYLES.primary)
      return `
      background-image: linear-gradient(120deg, #fa9ee9, #b87eea 70%, #81fee9);
      background-size: 200% auto;
      transition: background 0.4s ease;

      &:hover {
        background-position: right center;
      }
    `;

    if ($style === STYLES.secondary)
      return `
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

    return null;
  }};
`;

Button.defaultProps = {
  $size: SIZES.medium,
  $style: STYLES.primary,
};

export default Button;
