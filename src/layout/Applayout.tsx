import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

const Applayout = () => {
  return (
    <>
      <GlobalStyles />
      <Outlet />
    </>
  );
};

export default Applayout;
