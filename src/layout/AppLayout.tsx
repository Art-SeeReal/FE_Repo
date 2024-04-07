import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import * as S from '../components/styles';
import LayoutWrapper from './LayoutWrapper';

const AppLayout = () => {
  const location = useLocation();
  //임시 테스트 주석

  return (
    <LayoutWrapper>
      <S.Container $paddingTop={location.pathname !== '/'} $paddingBottom>
        <Outlet />
      </S.Container>
    </LayoutWrapper>
  );
};

export default AppLayout;
