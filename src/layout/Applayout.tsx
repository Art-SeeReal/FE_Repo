import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyles from './styles';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Applayout = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Applayout;
