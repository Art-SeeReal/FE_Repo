import React from 'react';
import styeld from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import * as S from '../styles';

const StyeldHeader = styeld.header`
    position: sticky;
    z-index: 1250;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 9rem;
    padding: 0 6rem;
    background: #fff;
`;

const Header = () => (
  <StyeldHeader>
    <h1>
      <Link to="/">
        <S.Logo />
      </Link>
    </h1>
    <HeaderNav />
  </StyeldHeader>
);

export default Header;
