import api from '../utils/api';
import {
  PostLoginRequest,
  PostLoginResponse,
  PostSignupRequest,
  GetUserTypesResponse,
  GetExistUserIdRequest,
  GetExistNicknameRequest,
  GetExistEmailRequest,
  GetExistReponse,
} from '../model/user';

export const login = (data: PostLoginRequest) => {
  return api<PostLoginResponse>({ url: '/login', method: 'post', data });
};

export const signup = (data: PostSignupRequest) => {
  return api({ url: '/signup', method: 'post', data });
};

export const getUserTypes = () => {
  return api<GetUserTypesResponse>({ url: '/user/types', method: 'get' });
};

export const getExistUserId = (params: GetExistUserIdRequest) => {
  return api<GetExistReponse>({ url: '/user/exist/user-id', method: 'get', params });
};

export const getExistNickname = (params: GetExistNicknameRequest) => {
  return api<GetExistReponse>({ url: '/user/exist/nickname', method: 'get', params });
};

export const getExistEmail = (params: GetExistEmailRequest) => {
  return api<GetExistReponse>({ url: '/user/exist/email', method: 'get', params });
};
