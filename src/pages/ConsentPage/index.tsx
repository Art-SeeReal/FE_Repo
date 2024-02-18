import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as S from '../../components/styles';
import ConsentText from './ConsentText';

const ConsentPageContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-self: flex-start;
  margin-bottom: 10px;
`;

const ConsentPage = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [term1Checked, setTerm1Checked] = useState(false);
  const [term2Checked, setTerm2Checked] = useState(false);
  const [term3Checked, setTerm3Checked] = useState(false);
  const navigate = useNavigate();
  const term1CheckboxRef = useRef<HTMLInputElement>(null);
  const term2CheckboxRef = useRef<HTMLInputElement>(null);
  const term3CheckboxRef = useRef<HTMLInputElement>(null);

  const handleAllCheckedChange = () => {
    setAllChecked(!allChecked);
    setTerm1Checked(!allChecked);
    setTerm2Checked(!allChecked);
    setTerm3Checked(!allChecked);
  };

  const handleTerm1Change = () => {
    setTerm1Checked(!term1Checked);
  };

  const handleTerm2Change = () => {
    setTerm2Checked(!term2Checked);
  };

  const handleTerm3Change = () => {
    setTerm3Checked(!term3Checked);
  };

  const handleButtonClick = () => {
    if (term1Checked && term2Checked && term3Checked) {
      navigate('/signUp');
    } else if (!term1Checked && term1CheckboxRef.current) {
      term1CheckboxRef.current.focus();
    } else if (!term2Checked && term2CheckboxRef.current) {
      term2CheckboxRef.current.focus();
    } else if (!term3Checked && term3CheckboxRef.current) {
      term3CheckboxRef.current.focus();
    }
  };

  return (
    <ConsentPageContainer>
      <S.Title>약관동의</S.Title>
      <CheckboxLabel>
        <S.Checkbox checked={allChecked} onChange={handleAllCheckedChange} />
        전체 약관 동의
      </CheckboxLabel>
      <CheckboxLabel>
        <S.Checkbox checked={term1Checked} onChange={handleTerm1Change} ref={term1CheckboxRef} />
        약관 1 동의
      </CheckboxLabel>
      <S.ScrollableContainer>
        <ConsentText />
      </S.ScrollableContainer>
      <CheckboxLabel>
        <S.Checkbox checked={term2Checked} onChange={handleTerm2Change} ref={term2CheckboxRef} />
        약관 2 동의
      </CheckboxLabel>
      <S.ScrollableContainer>
        <ConsentText />
      </S.ScrollableContainer>
      <CheckboxLabel>
        <S.Checkbox checked={term3Checked} onChange={handleTerm3Change} ref={term3CheckboxRef} />
        약관 3 동의
      </CheckboxLabel>
      <S.ScrollableContainer>
        <ConsentText />
      </S.ScrollableContainer>
      <S.Button onClick={handleButtonClick}>동의 완료</S.Button>
    </ConsentPageContainer>
  );
};

export default ConsentPage;
