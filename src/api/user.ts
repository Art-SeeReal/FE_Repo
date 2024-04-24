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
  PostLikeUserRequest,
  PostLikeUserResponse,
  DeleteLikeUserRequest,
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

export const addLikeUser = (data: PostLikeUserRequest) => {
  return api<PostLikeUserResponse>({ url: '/user/like', method: 'post', data });
};

export const deleteLikeUser = (data: DeleteLikeUserRequest) => {
  return api<DeleteLikeUserResponse>({ url: '/user/like', method: 'delete', data });
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
