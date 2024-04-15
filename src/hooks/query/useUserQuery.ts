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
  getLikeUsers,
  getUserInfo,
  findUserId,
  findExistUser,
  certEmail,
  changePassword,
} from '../../api/user';
import {
  PostLoginRequest,
  PostLoginResponse,
  PostSignupRequest,
  GetExistUserIdRequest,
  GetExistNicknameRequest,
  GetExistEmailRequest,
  GetLikeUsersResponse,
  GetUserResponse,
  GetUserIdRequest,
  GetUserExistRequest,
  PostUserCertEmailRequest,
  PutUserPasswordRequest,
} from '../../model/user';
import { setToken, removeToken } from '../../utils/auth';
import { useSetUserToken } from '../customs/useUserState';

const QUERY_KEY = {
  userTypes: 'userTypes',
  user: 'user',
  existUserId: 'existUserId',
  existNickname: 'existNickname',
  existEmail: 'existEmail',
  likeUser: 'likeUser',
  userId: 'userId',
  existUser: 'existUser',
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

export const useFetchLikeUser: () => UseQueryResult<GetLikeUsersResponse> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.likeUser],
    queryFn: getLikeUsers,
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

export const useFetchUserInfo: () => UseQueryResult<GetUserResponse> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: getUserInfo,
    select: (data) => data.data,
  });
};
