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
  GetUserIdRequest,
  GetUserIdResponse,
  GetUserExistRequest,
  GetUserExistResponse,
  PostUserCertEmailRequest,
  PostUserCertEmailResponse,
  PutUserPasswordRequest,
  PostKakaoLoginRequest,
  PostKakaoLoginResponse,
  PostNaverLoginRequest,
  PostNaverLoginResponse,
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
  return api<PostLikeUserResponse>({ url: `/user/${userId}/like`, method: 'post' });
};

export const deleteLikeUser = (userId: string) => {
  return api<DeleteLikeUserResponse>({ url: `/user/${userId}/like`, method: 'delete' });
};

export const findUserId = (params: GetUserIdRequest) => {
  return api<GetUserIdResponse>({ url: '/user/userId', method: 'get', params });
};

export const findExistUser = (params: GetUserExistRequest) => {
  return api<GetUserExistResponse>({ url: '/user/exist', method: 'get', params });
};

export const certEmail = (data: PostUserCertEmailRequest) => {
  return api<PostUserCertEmailResponse>({ url: '/user/cert/email', method: 'post', data });
};

export const changePassword = (data: PutUserPasswordRequest) => {
  return api({ url: '/user/password', method: 'put', data });
};

export const kakaoLogin = (data: PostKakaoLoginRequest) => {
  return api<PostKakaoLoginResponse>({ url: '/oauth/kakao', method: 'post', data });
};

export const naverLogin = (data: PostNaverLoginRequest) => {
  return api<PostNaverLoginResponse>({ url: '/oauth/naver', method: 'post', data });
};
