import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { userState } from './recoil/atoms/userState';
import { isLoginSelector } from './recoil/selectors/userSelectors';

import AppLayout from './layout/AppLayout';
import ErrorLayout from './layout/ErrorLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupAgreePage from './pages/SignupAgreePage';
import SignupFormPage from './pages/SignupFormPage';
import FindAccountPage from './pages/FindAccountPage';

import PortfolioPage from './pages/PortfolioPage';
import PortfolioRegisterPage from './pages/PortfolioRegisterPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import PortfolioModifyPage from './pages/PortfolioModifyPage';

import RecruitsPage from './pages/RecruitPage';
import RecruitsRegisterPage from './pages/RecruitRegisterPage';
import RecruitsDetailPage from './pages/RecruitDetailPage';
import RecruitsModifyPage from './pages/RecruitModifyPage';

import UserHomePage from './pages/UserHomePage';
import MyHomePage from './pages/MyHomePage';
import KakaoPage from './pages/OauthPage/KakaoPage';
import NaverPage from './pages/OauthPage/NaverPage';

export default () => {
  const { isAgreeForSignup } = useRecoilValue(userState);
  const isLogin = useRecoilValue(isLoginSelector);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/login" element={isLogin ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/oauth">
          <Route path="kakao" element={<KakaoPage />} />
          <Route path="naver" element={<NaverPage />} />
        </Route>

        <Route path="/signup">
          <Route index element={<Navigate to="agree" replace />} />
          <Route path="agree" element={<SignupAgreePage />} />
          <Route
            path="form"
            element={isAgreeForSignup ? <SignupFormPage /> : <Navigate to="/signup/agree" replace />}
          />
        </Route>

        <Route path="/find-account" element={isLogin ? <Navigate to="/" replace /> : <FindAccountPage />} />

        <Route path="/portfolios">
          <Route index element={<PortfolioPage />} />
          <Route path="register" element={<PortfolioRegisterPage />} />
          <Route path=":id" element={<PortfolioDetailPage />} />
          <Route path="modify/:id" element={<PortfolioModifyPage />} />
        </Route>

        <Route path="/recruits">
          <Route index element={<RecruitsPage />} />
          <Route path="register" element={<RecruitsRegisterPage />} />
          <Route path=":id" element={<RecruitsDetailPage />} />
          <Route path="modify/:id" element={<RecruitsModifyPage />} />
        </Route>
      </Route>

      <Route path="/users" element={isLogin ? <AppLayout /> : <ErrorLayout errorCode={401} />}>
        <Route index element={<Navigate to="/" replace />} />
        <Route path="mypage/home" element={<MyHomePage />} />
        <Route path=":userId/home" element={<UserHomePage />} />
      </Route>

      <Route path="*" element={<ErrorLayout errorCode={404} />} />
    </Routes>
  );
};
