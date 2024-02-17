import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { userData, logInResponse } from '../model/UserTypes';
import { fetchLogin } from '../api/login';

const QUERY_KEY = {
  logIn: 'logIn',
} as const;

export const useLogInQuery: (data: userData) => UseQueryResult<logInResponse> = ({ id, pw }: userData) => {
  return useQuery({
    queryKey: [QUERY_KEY.logIn],
    queryFn: () => fetchLogin({ id, pw }),
    enabled: false,
  });
};
