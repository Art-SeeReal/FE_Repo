import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import HeaderNavGnb from './HeaderNavGnb';
import { useLogout } from '../../hooks/query/useUserQuery';
import { isLoginSelector } from '../../recoil/selectors/userSelectors';

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
  {
    id: 3,
    to: '/inquiry',
    name: '문의하기',
  },
];

const StyledNav = styled.nav`
  display: flex;
  gap: 6rem;
`;

const HeaderNav = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const logout = useLogout();
  const navigate = useNavigate();

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
    <StyledNav>
      <HeaderNavGnb data={GnbItems} />
      <HeaderNavGnb data={GnbItemsForMembership} membership />
    </StyledNav>
  );
};

export default HeaderNav;
