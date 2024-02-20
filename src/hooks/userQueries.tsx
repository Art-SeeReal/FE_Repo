import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { loginData, loginResponse } from '../model/UserTypes';
import { fetchLogin } from '../api/login';

const QUERY_KEY = {
  login: 'login',
} as const;

export const useLoginQuery: (data: loginData) => UseQueryResult<loginResponse> = ({ id, pw }: loginData) => {
  return useQuery({
    queryKey: [QUERY_KEY.login],
    queryFn: () => fetchLogin({ id, pw }),
    enabled: false,
  });
};
