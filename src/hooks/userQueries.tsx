import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { userData, loginResponse } from '../model/UserTypes';
import { fetchLogin } from '../api/login';

const QUERY_KEY = {
  login: 'login',
} as const;

export const useLoginQuery: (data: userData) => UseQueryResult<loginResponse> = ({ id, pw }: userData) => {
  return useQuery({
    queryKey: [QUERY_KEY.login],
    queryFn: () => fetchLogin({ id, pw }),
    enabled: false,
  });
};
