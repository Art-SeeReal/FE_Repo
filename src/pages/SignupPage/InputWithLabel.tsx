import React from 'react';
import styled from 'styled-components';

interface InputWithLabelProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  inputRef?: React.RefObject<HTMLInputElement> | null;
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

const InputWithLabel = ({ id, label, placeholder, type, onChange, text, inputRef }: InputWithLabelProps) => {
  return (
    <InputWrapper>
      <StyledLabel>
        {label}
        {text}
      </StyledLabel>
      <StyledDivider />
      <StyledInput id={id} type={type} placeholder={placeholder} onChange={onChange} ref={inputRef} />
      <StyledDivider />
    </InputWrapper>
  );
};

InputWithLabel.defaultProps = {
  inputRef: null,
};

export default InputWithLabel;
