import React from 'react';
import styeld from 'styled-components';
import { Link } from 'react-router-dom';
import { RiCloseLine, RiMenuLine } from '@remixicon/react';
import HeaderNav from './HeaderNav';
import * as S from '../styles';
import { useMobileNavState } from '../../hooks/customs/useMobileNavState';

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

    ${S.Media.mobile`
      padding: 0 2rem;
    `}

    ${S.Logo} {
      ${S.Media.mobile`
        width: 5rem;
      `}
    }
`;

const StyledNavToggleButton = styeld.div`
  display: none;
  cursor: pointer;

  ${S.Media.mobile`
    display: block;
    position: relative;
    z-index: 100;
  `}
`;

const Header = () => {
  const { isOpen, toggleNav } = useMobileNavState();

  return (
    <StyeldHeader>
      <h1>
        <Link to="/">
          <S.Logo />
        </Link>
      </h1>
      <StyledNavToggleButton onClick={() => toggleNav()}>
        {isOpen ? <RiCloseLine size="3.2rem" /> : <RiMenuLine size="3.2rem" />}
      </StyledNavToggleButton>
      <HeaderNav />
    </StyeldHeader>
  );
};

export default Header;
