import React from 'react';
import { useKakaoLogin } from '../../hooks/query/useUserQuery';
import { isLoginSelector } from '../../recoil/selectors/userSelectors';
import LoginPage from './LoginPage';

const KakaoPage = () => {
  return <LoginPage useLogin={useKakaoLogin} isSuccessSelector={isLoginSelector} />;
};

export default KakaoPage;
