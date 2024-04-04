import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../components/styles';
import Checkbox from '../../components/Checkbox';
import TermsContent from './TermsContent';
import TermCheckSection from './TermCheckSection';
import { useDialog } from '../../hooks/customs/useDialogState';
import Dialog from '../../components/Dialog';
import { useSetAgreeForSignup } from '../../hooks/customs/useUserState';

const AgreePage = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [term1Checked, setTerm1Checked] = useState(false);
  const [term2Checked, setTerm2Checked] = useState(false);
  const [term3Checked, setTerm3Checked] = useState(false);
  const navigate = useNavigate();
  const { openDialog, closeDialog } = useDialog();

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

  const setAgreeForSignup = useSetAgreeForSignup();

  const handleClickAgreeButton = () => {
    if (!term1Checked || !term2Checked || !term3Checked) {
      openDialog(
        <Dialog header="약관 동의" footer={<S.Button onClick={closeDialog}>확인</S.Button>}>
          약관 동의에 모두 체크 후 가입 가능합니다.
        </Dialog>,
      );
      return;
    }

    setAgreeForSignup();
    navigate('/signup/form');
  };

  return (
    <S.Container $width={800}>
      <S.Title>약관 동의</S.Title>

      <TermCheckSection content={<TermsContent />}>
        <Checkbox id="checkBox1" name="checkBox1" value="checkBox1" checked={term1Checked} onChange={handleTerm1Change}>
          약관 1 동의
        </Checkbox>
      </TermCheckSection>

      <TermCheckSection content={<TermsContent />}>
        <Checkbox id="checkBox2" name="checkBox2" value="checkBox2" checked={term2Checked} onChange={handleTerm2Change}>
          약관 2 동의
        </Checkbox>
      </TermCheckSection>

      <TermCheckSection content={<TermsContent />}>
        <Checkbox id="checkBox3" name="checkBox3" value="checkBox3" checked={term3Checked} onChange={handleTerm3Change}>
          약관 3 동의
        </Checkbox>
      </TermCheckSection>

      <S.Row $justifyContent="flex-end" className="mt-2">
        <Checkbox
          id="allCheckbox"
          name="allCheckbox"
          value="allCheckbox"
          checked={allChecked}
          onChange={handleAllCheckedChange}
        >
          전체 약관 동의
        </Checkbox>
      </S.Row>

      <div className="mt-5">
        <S.Button onClick={handleClickAgreeButton} $block $size="large">
          동의 완료
        </S.Button>
      </div>
    </S.Container>
  );
};

export default AgreePage;
