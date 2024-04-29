import React from 'react';
import styled from 'styled-components';
import * as S from '../styles';
import { useDialog } from '../../hooks/customs/useDialogState';
import Dialog from '../Dialog';
import PrivacyPolicyText from '../policy/PrivacyPolicyText';

const StyledPolicyWrapper = styled.div`
  margin-left: auto;

  ${S.Media.mobile`
    margin-right: auto;
  `}
`;

const FooterPolicy = () => {
  const { openDialog } = useDialog();

  return (
    <StyledPolicyWrapper>
      <S.Button
        $style="linkWhite"
        onClick={() =>
          openDialog(
            <Dialog header="개인정보처리방침" width={960}>
              <PrivacyPolicyText />
            </Dialog>,
          )
        }
      >
        개인정보처리방침
      </S.Button>
    </StyledPolicyWrapper>
  );
};

export default FooterPolicy;
