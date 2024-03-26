import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { userState } from './recoil/atoms/userState';
import { isLoginSelector } from './recoil/selectors/userSelectors';

import AppLayout from './layout/AppLayout';
import LnbLayout from './layout/LnbLayout';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupAgreePage from './pages/SignupAgreePage';
import SignupFormPage from './pages/SignupFormPage';
import FindIdPwPage from './pages/FindIdPwPage';

import PortfoilioPage from './pages/PortfoliotPage';
import RegisterPortfolioPage from './pages/PortfoliotPage/RegisterPage';
import DetailPortfolioPage from './pages/PortfoliotPage/DetialPage';
import ModifyPortfolioPage from './pages/PortfoliotPage/ModifyPage';

import ArtPlannerHomePage from './pages/ArtPlannerPage/home';
import ArtPlannerRecruitsPage from './pages/ArtPlannerPage/recruits';

export default () => {
  const { isAgreeForSignup } = useRecoilValue(userState);
  const isLogin = useRecoilValue(isLoginSelector);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/login" element={isLogin ? <Navigate to="/" replace /> : <LoginPage />} />

        <Route path="/signup">
          <Route index element={<Navigate to="agree" replace />} />
          <Route path="agree" element={<SignupAgreePage />} />
          <Route
            path="form"
            element={isAgreeForSignup ? <SignupFormPage /> : <Navigate to="/signup/agree" replace />}
          />
        </Route>

        <Route path="/find-id-pw" element={<FindIdPwPage />} />

        <Route path="/portfolio">
          <Route index element={<PortfoilioPage />} />
          <Route path="register" element={<RegisterPortfolioPage />} />
          <Route path=":id" element={<DetailPortfolioPage />} />
          <Route path="update/:id" element={<ModifyPortfolioPage />} />
        </Route>

        <Route path="/art-planner" element={<LnbLayout />}>
          <Route index element={<NotFoundPage />} />
          <Route path=":id">
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<ArtPlannerHomePage />} />
            <Route path="recruits" element={<ArtPlannerRecruitsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
