import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import * as S from './styles';

interface Props {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: ReactElement;
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
      <S.Label htmlFor={htmlFor}>{label}</S.Label>
      {required && <sup className="required">*</sup>}
      {children}
      {error && error}
    </StyledFormControl>
  );
};

export default FormControl;
