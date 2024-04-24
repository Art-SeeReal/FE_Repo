import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { RecoilValueReadOnly, useRecoilValue } from 'recoil';
import Loading from '../../components/Loading';
import * as S from '../../components/styles';
import {
  PostKakaoLoginRequest,
  PostKakaoLoginResponse,
  PostNaverLoginRequest,
  PostNaverLoginResponse,
} from '../../model/user';

interface LoginPageProps {
  useLogin: () =>
    | UseMutationResult<AxiosResponse<PostKakaoLoginResponse>, Error, PostKakaoLoginRequest, unknown>
    | UseMutationResult<AxiosResponse<PostNaverLoginResponse>, Error, PostNaverLoginRequest, unknown>;
  isSuccessSelector: RecoilValueReadOnly<boolean>;
}

const LoginPage = ({ useLogin, isSuccessSelector }: LoginPageProps) => {
  const navigate = useNavigate();
  const { mutate: login, isSuccess } = useLogin();
  const code = new URL(window.location.href).searchParams.get('code');
  const isLogin = useRecoilValue(isSuccessSelector);

  useEffect(() => {
    if (code) {
      const loginCode = { code };
      login(loginCode);
    }
  }, [code, login]);

  useEffect(() => {
    if (isSuccess || isLogin) {
      navigate('/');
    }
  }, [isSuccess, isLogin, navigate]);

  return (
    <>
      <Loading />
      <S.Row $justifyContent="center">
        <p>로그인 중입니다...</p>
      </S.Row>
    </>
  );
};

export default LoginPage;
