import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { fetchFindId, fetchFindPw } from '../api/findIdPw';
import { RequestFindIdTypes, RequestFindPwTypes, loginData, loginResponse, SignupData } from '../model/UserTypes';
import { fetchLogin } from '../api/login';
import { fetchRegisterUser } from '../api/signup';

const QUERY_KEY_LOGIN = 'login' as const;
const QUERY_KEY_FIND_ID = 'findId' as const;
const QUERY_KEY_FIND_PW = 'findPw' as const;

export const useFindIdQuery: (data: RequestFindIdTypes) => UseQueryResult<{ success: boolean }> = ({
  name,
  email,
}: RequestFindIdTypes) => {
  return useQuery({
    queryKey: [QUERY_KEY_FIND_ID],
    queryFn: () => fetchFindId({ name, email }),
    enabled: false,
  });
};

export const useFindPwQuery: (data: RequestFindPwTypes) => UseQueryResult<{ success: boolean }> = ({
  name,
  id,
  email,
}: RequestFindPwTypes) => {
  return useQuery({
    queryKey: [QUERY_KEY_FIND_PW],
    queryFn: () => fetchFindPw({ name, id, email }),
    enabled: false,
  });
};

export const useLoginQuery: (data: loginData) => UseQueryResult<loginResponse> = ({ id, pw }: loginData) => {
  return useQuery({
    queryKey: [QUERY_KEY_LOGIN],
    queryFn: () => fetchLogin({ id, pw }),
    enabled: false,
  });
};

export const useSignupQuery: () => UseMutationResult<
  AxiosResponse<SignupData>,
  AxiosError,
  { signupData: SignupData }
> = () =>
  useMutation<AxiosResponse<SignupData>, AxiosError, { signupData: SignupData }>({
    mutationFn: fetchRegisterUser,
  });
