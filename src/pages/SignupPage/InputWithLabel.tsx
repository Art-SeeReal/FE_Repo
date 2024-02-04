import React from 'react';
import styled from 'styled-components';

interface InputWithLabelProps {
  label: string;
  placeholder: string;
  type: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledLabel = styled.label`
  align-self: flex-start;
  font-weight: bold;
  margin-left: 10px;
`;

const StyledInput = styled.input`
  width: 90%;
  min-width: 450px;
  max-width: 600px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px; /* You may adjust the height */
  background-color: #000;
  margin: 10px 0;
`;

const InputWithLabel = ({ label, placeholder, type }: InputWithLabelProps) => {
  return (
    <InputWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledDivider />
      <StyledInput type={type} placeholder={placeholder} />
      <StyledDivider />
    </InputWrapper>
  );
};

export default InputWithLabel;
