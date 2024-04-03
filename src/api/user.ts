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
  PostLikeUserResponse,
  DeleteLikeUserResponse,
  GetLikeUsersResponse,
  GetUserResponse,
} from '../model/user';

export const login = (data: PostLoginRequest) => {
  return api<PostLoginResponse>({ url: '/login', method: 'post', data });
};

export const signup = (data: PostSignupRequest) => {
  return api({ url: '/signup', method: 'post', data });
};

export const getUserInfo = () => {
  return api<GetUserResponse>({ url: '/user', method: 'get' });
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

export const getLikeUsers = () => {
  return api<GetLikeUsersResponse>({ url: `/user/like/users`, method: 'get' });
};

export const addLikeUser = (userId: string) => {
  return api<PostLikeUserResponse>({ url: `/user/like/${userId}`, method: 'post' });
};

export const deleteLikeUser = (userId: string) => {
  return api<DeleteLikeUserResponse>({ url: `/user/like/${userId}`, method: 'delete' });
};
