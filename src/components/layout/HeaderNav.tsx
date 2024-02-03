import React from 'react';
import styled from 'styled-components';
import HeaderNavGnb from './HeaderNavGnb';

const GnbItems = [
  {
    id: 1,
    to: '/portfolio',
    name: '예술가 포트폴리오',
  },
  {
    id: 2,
    to: '/recruits',
    name: '공고',
  },
  {
    id: 3,
    to: '/inquiry',
    name: '문의하기',
  },
];

const GnbItemsForMembership = [
  {
    id: 1,
    to: '/login',
    name: '로그인',
  },
  {
    id: 2,
    to: '/join',
    name: '회원가입',
  },
];

const StyledNav = styled.nav`
  display: flex;
  gap: 6rem;
`;

const HeaderNav = () => (
  <StyledNav>
    <HeaderNavGnb data={GnbItems} />
    <HeaderNavGnb data={GnbItemsForMembership} membership />
  </StyledNav>
);

export default HeaderNav;
