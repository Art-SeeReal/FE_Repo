import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    return config;
  },
  (error): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response): AxiosResponse => {
    return response.data;
  },
  (error: AxiosError) => {
    console.error(error);
    // return Promise.reject(error);
  },
);

export default api;
