import styled from 'styled-components';
import { ReactNode } from 'react';

const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

type SIZES = (typeof SIZES)[keyof typeof SIZES];

interface Props {
  children?: ReactNode;
  size?: SIZES;
  $block?: boolean;
  $error?: boolean;
}

const Field = styled.input<Props>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 0.75em 1em;
  border-radius: 0.8rem;
  border: 1px solid var(--color-border);
  outline: 0;

  &::placeholder {
    color: var(--color-placeholder);
  }

  ${({ $error }) => {
    if ($error)
      return `
        color: var(--color-error);
        outline: 1px solid var(--color-error);
        border-color: var(--color-error);
    `;

    return `
        &:focus {
            outline: 1px solid var(--color-primary);
            border-color: var(--color-primary);
        }
    `;
  }}

  ${({ size }) => {
    if (size === SIZES.small)
      return `
        max-width: 20rem;
        font-size: var(--text-caption);
      `;
    if (size === SIZES.medium)
      return `
        max-width: 30rem;
        font-size: var(--text-body);
      `;
    if (size === SIZES.large)
      return `
        max-width: 60rem;
        font-size: var(--sub-title-3);
      `;

    return null;
  }};

  ${({ $block }) => $block && `max-width: none`};
`;

Field.defaultProps = {
  size: SIZES.medium,
  $block: true,
};

export default Field;
