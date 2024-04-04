import styled from 'styled-components';
import { ReactNode } from 'react';

const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

type SIZES = (typeof SIZES)[keyof typeof SIZES];

export interface FieldProps {
  as?: 'input' | 'textarea';
  children?: ReactNode;
  $size?: SIZES;
  $block?: boolean;
  $inline?: boolean;
  $error?: boolean;
}

export const Field = styled.input<FieldProps>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 0.75em 1em;
  border-radius: 0.8rem;
  border: 1px solid var(--color-border-2);
  outline: 0;
  -webkit-appearance: none;
  appearance: none;

  &::placeholder {
    color: var(--color-placeholder);
  }

  &:disabled,
  &:read-only {
    opacity: 0.5;
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

  ${({ $size }) => {
    if ($size === SIZES.small)
      return `
        max-width: 20rem;
        font-size: var(--text-caption);
      `;
    if ($size === SIZES.medium)
      return `
        max-width: 30rem;
        font-size: var(--text-body-1);
      `;
    if ($size === SIZES.large) {
      return `
        max-width: 60rem;
        font-size: var(--sub-title-3);
      `;
    }

    return null;
  }};

  ${({ $block }) => $block && `max-width: none`};

  ${({ $inline }) => $inline && `width: auto; max-width: none;`}

  ${({ as }) => {
    if (as === 'textarea') {
      return `
        resize: none;
      `;
    }

    return null;
  }}
`;

Field.defaultProps = {
  $size: SIZES.medium,
  $block: true,
  $inline: false,
};
