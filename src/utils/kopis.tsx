import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import React, { ReactNode, useEffect } from 'react';
import { useToast } from '../hooks/customs/useToastState';
// import { getToken } from './auth';

const kopis = axios.create({
  baseURL: '/kopis',
  headers: { 'Content-Type': 'application/xml' },
});

const Interceptor = ({ children }: { children: ReactNode }) => {
  const { appendToast } = useToast();

  useEffect(() => {
    kopis.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Object.assign(config.headers, { Authorization: `Bearer ${getToken()}` });
        return config;
      },
      (error: Promise<AxiosError>) => {
        return Promise.reject(error);
      },
    );

    kopis.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError<{ message: string }>) => {
        appendToast({ content: error.response?.data.message || error.message, type: 'error' });
        return Promise.reject(error);
      },
    );
  }, []);

  return <div>{children}</div>;
};

export default kopis;

export { Interceptor };
