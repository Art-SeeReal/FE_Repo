import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  login,
  signup,
  getUserTypes,
  getExistUserId,
  getExistNickname,
  getExistEmail,
  addLikeUser,
  deleteLikeUser,
  getLikeAuthor,
  getUser,
  findUserId,
  findExistUser,
  certEmail,
  changePassword,
  getUserType,
  getUserProfile,
  kakaoLogin,
  naverLogin,
  getProfile,
  saveIntro,
  changeInfo,
  checkPassword,
  getScrapPortfolios,
  getScrapRecruits,
  getUserPortfolios,
  getUserRecruits,
  getLikePlanner,
  getAuthorApplyStatus,
  getUserInfo,
  getPlannerApplyStatus,
} from '../../api/user';
import {
  PostLoginRequest,
  PostLoginResponse,
  PostSignupRequest,
  GetExistUserIdRequest,
  GetExistNicknameRequest,
  GetExistEmailRequest,
  GetUserIdRequest,
  GetUserExistRequest,
  PostUserCertEmailRequest,
  PutUserPasswordRequest,
  GetUserTypeRequest,
  GetUserProfileRequest,
  PostKakaoLoginRequest,
  PostKakaoLoginResponse,
  PostNaverLoginRequest,
  PostNaverLoginResponse,
  PutUserIntroRequest,
  PutUserInfoRequest,
  PostCheckPasswordRequest,
  GetScrapPortfoliosRequest,
  GetScrapPortfoliosResponse,
  GetScrapRecruitsRequest,
  GetScrapRecruitsResponse,
  GetUserRecruitsRequest,
  GetUserRecruitsResponse,
  GetUserPortfoliosRequest,
  GetUserPortfoliosResponse,
} from '../../model/user';
import { setToken, removeToken } from '../../utils/auth';
import { useSetUserToken } from '../customs/useUserState';

const QUERY_KEY = {
  userTypes: 'userTypes',
  user: 'user',
  existUserId: 'existUserId',
  existNickname: 'existNickname',
  existEmail: 'existEmail',
  likeAuthor: 'likeAuthor',
  likePlanner: 'likePlanner',
  userId: 'userId',
  existUser: 'existUser',
  userType: 'userType',
  userProfile: 'userProfile',
  scrapPortfolios: 'scrapPortfolios',
  scrapRecruits: 'scrapRecruits',
  applyAuthor: 'applyAuthor',
  applyPlanner: 'applyPlanner',
  userInfo: 'userInfo',
} as const;

export const useLogin = () => {
  const setUserToken = useSetUserToken();

  return useMutation({
    mutationFn: (data: PostLoginRequest) => login(data),
    onSuccess: (response: AxiosResponse<PostLoginResponse>) => {
      setToken(response.data.token);
      setUserToken(response.data.token);
    },
  });
};

export const useLogout = () => {
  const setUserToken = useSetUserToken();

  return () => {
    removeToken();
    setUserToken('');
  };
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: PostSignupRequest) => signup(data),
  });
};

export const useFetchUserTypes = () => {
  return useQuery({
    queryKey: [QUERY_KEY.userTypes],
    queryFn: getUserTypes,
    staleTime: 60 * 1000 * 60 * 24,
    select: (data) => data.data,
  });
};

export const useFetchExistUserId = (params: GetExistUserIdRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.existUserId],
    queryFn: () => getExistUserId(params),
    select: (data) => data.data,
    enabled: false,
    gcTime: 0,
  });
};

export const useFetchExistNickname = (params: GetExistNicknameRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.existNickname],
    queryFn: () => getExistNickname(params),
    select: (data) => data.data,
    enabled: false,
    gcTime: 0,
  });
};

export const useFetchExistEmail = (params: GetExistEmailRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.existEmail],
    queryFn: () => getExistEmail(params),
    select: (data) => data.data,
    enabled: false,
    gcTime: 0,
  });
};

export const useFetchUserId = (params: GetUserIdRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.userId],
    queryFn: () => findUserId(params),
    select: (data) => data.data,
    enabled: false,
    gcTime: 0,
    retry: 0,
  });
};

export const useFetchUserExist = (params: GetUserExistRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.existUser],
    queryFn: () => findExistUser(params),
    select: (data) => data.data,
    enabled: false,
    gcTime: 0,
    retry: 0,
  });
};

export const useCertEmail = () => {
  return useMutation({
    mutationFn: (data: PostUserCertEmailRequest) => certEmail(data),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: PutUserPasswordRequest) => changePassword(data),
  });
};

export const useFetchLikeAuthor = () => {
  return useQuery({
    queryKey: [QUERY_KEY.likeAuthor],
    queryFn: getLikeAuthor,
    select: (data) => data.data,
  });
};

export const useFetchLikePlanner = () => {
  return useQuery({
    queryKey: [QUERY_KEY.likePlanner],
    queryFn: getLikePlanner,
    select: (data) => data.data,
  });
};

export const useAddLikeUser = () => {
  return useMutation({
    mutationFn: (userId: string) => addLikeUser(userId),
  });
};

export const useDeleteLikeUser = () => {
  return useMutation({
    mutationFn: (userId: string) => deleteLikeUser(userId),
  });
};

export const useFetchUser = () => {
  return useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: getUser,
    select: (data) => data.data,
  });
};

export const useFetchUserType = (params: GetUserTypeRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.userType],
    queryFn: () => getUserType(params),
    select: (data) => data.data,
  });
};

export const useFetchUserInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEY.userInfo],
    queryFn: getUserInfo,
    select: (data) => data.data,
  });
};

export const useFetchUserProfile = (params: GetUserProfileRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.userProfile],
    queryFn: () => getUserProfile(params),
    select: (data) => data.data,
  });
};

export const useKakaoLogin = () => {
  const setUserToken = useSetUserToken();
  return useMutation({
    mutationFn: (data: PostKakaoLoginRequest) => kakaoLogin(data),
    onSuccess: (response: AxiosResponse<PostKakaoLoginResponse>) => {
      setToken(response.data.token);
      setUserToken(response.data.token);
    },
  });
};

export const useNaverLogin = () => {
  const setUserToken = useSetUserToken();
  return useMutation({
    mutationFn: (data: PostNaverLoginRequest) => naverLogin(data),
    onSuccess: (response: AxiosResponse<PostNaverLoginResponse>) => {
      setToken(response.data.token);
      setUserToken(response.data.token);
    },
  });
};

export const useFetchProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEY.userProfile],
    queryFn: getProfile,
    select: (data) => data.data,
  });
};

export const useUpdateIntro = () => {
  return useMutation({
    mutationFn: (data: PutUserIntroRequest) => saveIntro(data),
  });
};

export const useChangeInfo = () => {
  return useMutation({
    mutationFn: (data: PutUserInfoRequest) => changeInfo(data),
  });
};

export const useCheckPassword = () => {
  return useMutation({
    mutationFn: (data: PostCheckPasswordRequest) => checkPassword(data),
  });
};

export const useFetchScrapPortfolios = (
  params: GetScrapPortfoliosRequest,
): UseQueryResult<GetScrapPortfoliosResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.scrapPortfolios],
    queryFn: () => getScrapPortfolios(params),
    select: (data) => data.data,
  });
};

export const useFetchScrapRecruits = (params: GetScrapRecruitsRequest): UseQueryResult<GetScrapRecruitsResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.scrapRecruits],
    queryFn: () => getScrapRecruits(params),
    select: (data) => data.data,
  });
};

export const useFetchUserPortfolios = (params: GetUserPortfoliosRequest): UseQueryResult<GetUserPortfoliosResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.scrapPortfolios],
    queryFn: () => getUserPortfolios(params),
    select: (data) => data.data,
  });
};

export const useFetchUserRecruits = (params: GetUserRecruitsRequest): UseQueryResult<GetUserRecruitsResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.scrapRecruits],
    queryFn: () => getUserRecruits(params),
    select: (data) => data.data,
  });
};

export const useFetchAuthorApplyStatus = () => {
  return useQuery({
    queryKey: [QUERY_KEY.applyAuthor],
    queryFn: getAuthorApplyStatus,
    select: (data) => data.data,
  });
};

export const useFetchPlannerApplyStatus = () => {
  return useQuery({
    queryKey: [QUERY_KEY.applyPlanner],
    queryFn: getPlannerApplyStatus,
    select: (data) => data.data,
  });
};
