import React from 'react';
import styled from 'styled-components';
import Container from '../styles/Container';
import StyeldLogo from '../styles/Logo';
import FooterPolicy from './FooterPolicy';

const StyeldFooter = styled.footer`
  display: flex;
  padding: 6rem var(--spacing);
  background-color: #000;
  color: #fff;
`;

const StyledFooterContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  gap: 4rem;
  width: 100%;
`;

const StyledAddress = styled.address`
  line-height: 1.75;
`;

const StyledCopyright = styled.p`
  margin-top: 2rem;
  font-size: var(--text-body-2);
  color: var(--color-secondary);
`;

const Footer = () => (
  <StyeldFooter>
    <StyledFooterContainer>
      <StyeldLogo $grayscale />

      <div>
        <StyledAddress>
          서울 마포구 월드컵로 32길 19
          <br />
          Tel. <a href="tel:02-1234-5678">02-1234-5678</a>
          <br />
          E-mail. <a href="mailto:art.seereal@gmail.com">art.seereal@gmail.com</a>
        </StyledAddress>
        <StyledCopyright>Copyright &copy; 2024 Art-SeeReal. All rights reserved.</StyledCopyright>
      </div>
      <FooterPolicy />
    </StyledFooterContainer>
  </StyeldFooter>
);

export default Footer;
