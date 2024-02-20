import React from 'react';
import styled from 'styled-components';
import * as S from '../styles';

const StyledPolicyWrapper = styled.div`
  margin-left: auto;
`;

const FooterPolicy = () => (
  <StyledPolicyWrapper>
    <S.Button $style="linkWhite">개인정보처리방침</S.Button>
  </StyledPolicyWrapper>
);

export default FooterPolicy;
