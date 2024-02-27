import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { RiCheckboxBlankLine, RiCheckboxFill } from '@remixicon/react';
import * as S from './styles';

const STYLES = {
  default: 'default',
  button: 'button',
} as const;

type STYLES = keyof typeof STYLES;

interface LabelProps {
  $error?: boolean;
  $disabled?: boolean;
  $style?: STYLES;
}

const StyledLabel = styled.label<LabelProps>`
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;

  input {
    -webkit-appearance: none;
    appearance: none;
  }

  ${({ $style }) => {
    if ($style === STYLES.button) {
      return ``;
    }

    return null;
  }}

  ${({ $error }) =>
    $error &&
    `
    color: var(--color-error);
    .remixicon { color: var(--color-error);}
    `}

  ${({ $disabled }) =>
    $disabled &&
    `
    opacity: .5;
    cursor: no-drop;
    `};
`;

interface CheckboxProps {
  id: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  $error?: boolean;
  $style?: STYLES;
  children: string;
}

const Checkbox = ({ id, name, value, checked, disabled, onChange, $error, $style, children }: CheckboxProps) => {
  return (
    <StyledLabel htmlFor={id} $error={$error} $disabled={disabled}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {$style === STYLES.default && (checked ? <RiCheckboxFill /> : <RiCheckboxBlankLine />)}
      {$style === STYLES.default ? (
        <span className="ml-1">{children}</span>
      ) : (
        <S.Button as="div" $size="small" $style="secondary" $border={!checked}>
          {children}
        </S.Button>
      )}
    </StyledLabel>
  );
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  $error: false,
  $style: STYLES.default,
};

export default Checkbox;
