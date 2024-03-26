import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine } from '@remixicon/react';

interface LabelProps {
  $error?: boolean;
  $disabled?: boolean;
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

interface Props {
  id: string;
  name: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children: string;
  $error?: boolean;
}

const Radio = ({ checked, children, disabled, $error, ...rest }: Props) => {
  return (
    <StyledLabel $error={$error} $disabled={disabled}>
      <input type="radio" checked={checked} disabled={disabled} {...rest} />
      {checked ? <RiCheckboxCircleFill /> : <RiCheckboxBlankCircleLine />}
      <span className="ml-2">{children}</span>
    </StyledLabel>
  );
};

export default Radio;
