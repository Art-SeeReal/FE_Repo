import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import HeaderNavGnb from './HeaderNavGnb';
import { useLogout } from '../../hooks/query/useUserQuery';
import { isLoginSelector } from '../../recoil/selectors/userSelectors';
import * as S from '../styles';
import { useMobileNavState } from '../../hooks/customs/useMobileNavState';

const GnbItems = [
  {
    id: 1,
    to: '/portfolios',
    name: '예술가 포트폴리오',
  },
  {
    id: 2,
    to: '/recruits',
    name: '공고',
  },
];

const StyledNav = styled.nav`
  display: flex;
  gap: 6rem;

  ${S.Media.tablet`
    gap: 3rem;
  `}

  ${S.Media.mobile`
    flex-direction: column;
    gap: 2rem;
    padding: 9rem 0;
    position: fixed;
    top: 0;
    right: 0;
    width: 90%;
    height: 100%;
    background-color: #fff;
    box-shadow: -.5rem -.5rem 1rem rgba(0, 0, 0, .15);
    transform: translateX(120%);
    transition: transform .4s ease-in-out;
  `}

  &.is-open {
    ${S.Media.mobile`
      transform: translateX(0);
    `}
  }
`;

const HeaderNav = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const logout = useLogout();
  const navigate = useNavigate();

  const { isOpen } = useMobileNavState();

  const GnbItemsForMembership = useMemo(() => {
    return isLogin
      ? [
          {
            id: 1,
            name: '로그아웃',
            onClick: () => {
              logout();
              navigate('/');
            },
          },
          {
            id: 2,
            to: '/mypage',
            name: '마이페이지',
          },
        ]
      : [
          {
            id: 1,
            to: '/login',
            name: '로그인',
          },
          {
            id: 2,
            to: '/signup',
            name: '회원가입',
          },
        ];
  }, [isLogin]);

  return (
    <StyledNav className={`${isOpen ? 'is-open' : ''}`}>
      <HeaderNavGnb data={GnbItems} />
      <HeaderNavGnb data={GnbItemsForMembership} membership />
    </StyledNav>
  );
};

export default HeaderNav;
