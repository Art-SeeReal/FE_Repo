import React from 'react';
import { useNaverLogin } from '../../hooks/query/useUserQuery';
import { isLoginSelector } from '../../recoil/selectors/userSelectors';
import LoginPage from './LoginPage';

const NaverPage = () => {
  return <LoginPage useLogin={useNaverLogin} isSuccessSelector={isLoginSelector} />;
};

export default NaverPage;
