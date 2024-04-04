import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import React, { ReactNode, useEffect } from 'react';
import { useToast } from '../hooks/customs/useToastState';
// import { getToken } from './auth';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '',
  headers: { 'Content-Type': 'application/json' },
});

const Interceptor = ({ children }: { children: ReactNode }) => {
  const { appendToast } = useToast();

  useEffect(() => {
    api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Object.assign(config.headers, { Authorization: `Bearer ${getToken()}` });
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
        appendToast({ content: error.response?.data.message || error.message, type: 'error' });
        return Promise.reject(error);
      },
    );
  }, []);

  return <div>{children}</div>;
};

export default api;

export { Interceptor };
