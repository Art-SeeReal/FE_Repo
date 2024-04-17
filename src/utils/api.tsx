import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/customs/useToastState';
import { getToken } from './auth';
import { useDialog } from '../hooks/customs/useDialogState';
import Dialog from '../components/Dialog';
import * as S from '../components/styles';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '',
  headers: { 'Content-Type': 'application/json' },
});

const Interceptor = ({ children }: { children: ReactNode }) => {
  const { appendToast } = useToast();
  const { openDialog, closeDialog } = useDialog();
  const navigate = useNavigate();

  const handleClickLoginPage = () => {
    navigate('/login');
    closeDialog();
  };

  useEffect(() => {
    api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const userToken = getToken();
        if (userToken) {
          Object.assign(config.headers, { Authorization: `Bearer ${userToken}` });
        }
        return config;
      },
      (error: Promise<AxiosError>) => {
        return Promise.reject(error);
      },
    );

    api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError<{ message: string }>) => {
        const statusCode = error.response?.status;

        if (statusCode === 401) {
          // 권한 에러
          openDialog(
            <Dialog
              header="알림"
              footer={
                <>
                  <S.Button onClick={closeDialog} $style="secondary">
                    취소
                  </S.Button>
                  <S.Button onClick={handleClickLoginPage}>로그인 페이지로</S.Button>
                </>
              }
            >
              로그인이 필요한 서비스입니다.
            </Dialog>,
          );
        } else if (statusCode === 404) {
          // 404 에러
          navigate('/404');
        } else {
          // 그 외 에러
          appendToast({ content: error.response?.data.message || error.message, type: 'error' });
        }

        return Promise.reject(error);
      },
    );
  }, []);

  return <div>{children}</div>;
};

export default api;

export { Interceptor };
