import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as S from '../../components/styles';
import Checkbox from '../../components/Checkbox';
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
      navigate('/join');
    }
  };

  return (
    <ConsentPageContainer>
      <S.Title>약관동의</S.Title>
      <CheckboxLabel>
        <Checkbox
          id="allCheckbox"
          name="allCheckbox"
          value="allCheckbox"
          checked={allChecked}
          onChange={handleAllCheckedChange}
        >
          전체 약관 동의
        </Checkbox>
      </CheckboxLabel>
      <CheckboxLabel>
        <Checkbox id="checkBox1" name="checkBox1" value="checkBox1" checked={term1Checked} onChange={handleTerm1Change}>
          약관 1 동의
        </Checkbox>
      </CheckboxLabel>
      <S.ScrollableContainer>
        <ConsentText />
      </S.ScrollableContainer>
      <CheckboxLabel>
        <Checkbox id="checkBox2" name="checkBox2" value="checkBox2" checked={term2Checked} onChange={handleTerm2Change}>
          약관 2 동의
        </Checkbox>
      </CheckboxLabel>
      <S.ScrollableContainer>
        <ConsentText />
      </S.ScrollableContainer>
      <CheckboxLabel>
        <Checkbox id="checkBox3" name="checkBox3" value="checkBox3" checked={term3Checked} onChange={handleTerm3Change}>
          약관 3 동의
        </Checkbox>
      </CheckboxLabel>
      <S.ScrollableContainer>
        <ConsentText />
      </S.ScrollableContainer>
      <S.Button onClick={handleButtonClick}>동의 완료</S.Button>
    </ConsentPageContainer>
  );
};

export default ConsentPage;
