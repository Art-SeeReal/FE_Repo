import React from 'react';
import styled from 'styled-components';

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px;
`;

const Label = styled.label`
  margin-right: 8px;
`;

const CheckboxInput = styled.input`
  margin-right: 4px;
`;

const CheckBox = ({ label, checked, onChange, inputRef }: CheckBoxProps) => {
  return (
    <CheckboxContainer>
      <Label>{label}</Label>
      <CheckboxInput type="checkbox" checked={checked} onChange={onChange} ref={inputRef} />
    </CheckboxContainer>
  );
};

export default CheckBox;
