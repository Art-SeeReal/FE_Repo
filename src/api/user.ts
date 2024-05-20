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
  GetLikeAuthorResponse,
  GetLikePlannerResponse,
  GetUserResponse,
  GetUserIdRequest,
  GetUserIdResponse,
  GetUserExistRequest,
  GetUserExistResponse,
  PostUserCertEmailRequest,
  PostUserCertEmailResponse,
  PutUserPasswordRequest,
  GetUserTypeRequest,
  GetUserTypeResponse,
  GetUserProfileRequest,
  GetUserProfileResponse,
  PutUserIntroRequest,
  PostKakaoLoginRequest,
  PostKakaoLoginResponse,
  PostNaverLoginRequest,
  PostNaverLoginResponse,
  GetProfileResponse,
  PutUserInfoRequest,
  PostCheckPasswordRequest,
  GetScrapPortfoliosRequest,
  GetScrapPortfoliosResponse,
  GetScrapRecruitsRequest,
  GetScrapRecruitsResponse,
  GetUserPortfoliosRequest,
  GetUserPortfoliosResponse,
  GetUserRecruitsResponse,
  GetUserRecruitsRequest,
  GetUserInfoResponse,
} from '../model/user';
import { GetAuthorApplyStatusResponse, GetPlannerApplyStatusResponse } from '../model/recruits';

export const login = (data: PostLoginRequest) => {
  return api<PostLoginResponse>({ url: '/login', method: 'post', data });
};

export const signup = (data: PostSignupRequest) => {
  return api({ url: '/signup', method: 'post', data });
};

export const getUser = () => {
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

export const getLikeAuthor = () => {
  return api<GetLikeAuthorResponse>({ url: `/user/like/author`, method: 'get' });
};

export const getLikePlanner = () => {
  return api<GetLikePlannerResponse>({ url: `/user/like/planner`, method: 'get' });
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

export const getUserType = (params: GetUserTypeRequest) => {
  return api<GetUserTypeResponse>({ url: `/users/${params.userId}/type`, method: 'get' });
};

export const getUserInfo = () => {
  return api<GetUserInfoResponse>({ url: `/user/info`, method: 'get' });
};

export const getUserProfile = (params: GetUserProfileRequest) => {
  return api<GetUserProfileResponse>({ url: `/users/${params.userId}/profile`, method: 'get' });
};

export const saveIntro = (data: PutUserIntroRequest) => {
  return api<PutUserIntroRequest>({ url: '/user/intro', method: 'put', data });
};

export const kakaoLogin = (data: PostKakaoLoginRequest) => {
  return api<PostKakaoLoginResponse>({ url: '/oauth/kakao', method: 'post', data });
};

export const naverLogin = (data: PostNaverLoginRequest) => {
  return api<PostNaverLoginResponse>({ url: '/oauth/naver', method: 'post', data });
};

export const getProfile = () => {
  return api<GetProfileResponse>({ url: `/user/profile`, method: 'get' });
};

export const changeInfo = (data: PutUserInfoRequest) => {
  return api({ url: '/user', method: 'put', data });
};

export const checkPassword = (data: PostCheckPasswordRequest) => {
  return api({ url: '/user/auth', method: 'post', data });
};

export const getScrapPortfolios = (params: GetScrapPortfoliosRequest) => {
  return api<GetScrapPortfoliosResponse>({ url: '/user/scrap/portfolios', method: 'get', params });
};

export const getScrapRecruits = (params: GetScrapRecruitsRequest) => {
  return api<GetScrapRecruitsResponse>({ url: '/user/scrap/recruits', method: 'get', params });
};

export const getUserPortfolios = (params: GetUserPortfoliosRequest) => {
  return api<GetUserPortfoliosResponse>({ url: '/user/portfolios', method: 'get', params });
};

export const getUserRecruits = (params: GetUserRecruitsRequest) => {
  return api<GetUserRecruitsResponse>({ url: '/user/recruits', method: 'get', params });
};

export const getAuthorApplyStatus = () => {
  return api<GetAuthorApplyStatusResponse>({ url: '/user/apply/author', method: 'get' });
};

export const getPlannerApplyStatus = () => {
  return api<GetPlannerApplyStatusResponse>({ url: '/user/apply/planner', method: 'get' });
};
