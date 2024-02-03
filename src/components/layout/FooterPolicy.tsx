import React from 'react';
import styled from 'styled-components';
import StyleButton from '../styles/Button';

const StyledPolicyWrapper = styled.div`
  margin-left: auto;
`;

const FooterPolicy = () => (
  <StyledPolicyWrapper>
    <StyleButton $style="link">개인정보처리방침</StyleButton>
  </StyledPolicyWrapper>
);

export default FooterPolicy;
