import React from 'react';
import { Outlet } from 'react-router-dom';
import LayoutWrapper from './LayoutWrapper';
import * as S from '../components/styles';

const LnbLayout = () => {
  return (
    <LayoutWrapper>
      <S.Container>
        <Outlet />
      </S.Container>
    </LayoutWrapper>
  );
};

export default LnbLayout;
