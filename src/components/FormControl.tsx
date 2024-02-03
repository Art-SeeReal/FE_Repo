import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Label from './styles/Label';

interface Props {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: boolean;
  children: ReactNode;
}

const StyledFormControl = styled.div`
  margin-bottom: 1em;

  .required {
    margin-left: 0.25em;
    font-size: var(--text-caption);
  }
`;

const FormControl = ({ label, htmlFor, required, error, children }: Props) => {
  return (
    <StyledFormControl>
      <Label htmlFor={htmlFor}>{label}</Label>
      {required && <sup className="required">*</sup>}
      {children}
      {error && error}
    </StyledFormControl>
  );
};

export default FormControl;
