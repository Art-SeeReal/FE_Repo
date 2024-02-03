import React from 'react';
import styeld from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import StyledLogo from '../styles/Logo';

const StyeldHeader = styeld.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 0 6rem;
    height: 9rem;
`;

const Header = () => (
  <StyeldHeader>
    <h1>
      <Link to="/">
        <StyledLogo />
      </Link>
    </h1>
    <HeaderNav />
  </StyeldHeader>
);

export default Header;
