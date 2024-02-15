import React from 'react';
import { RecoilRoot } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import Applayout from './layout/Applayout';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PrivatePage from './pages/LoginPage/PrivatePage';

const App = () => {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Applayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/private" element={<PrivatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </RecoilRoot>
  );
};

export default App;
