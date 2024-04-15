import React, { ReactNode } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import * as S from '../components/styles';
import GlobalStyles from './styles';
import ScrollToTop from '../components/ScrollToTop';

export default ({ children }: { children: ReactNode }) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <S.Main>{children}</S.Main>
      <Footer />
      <ScrollToTop />
    </>
  );
};
