import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserData } from '../model/UserTypes';
import { fetchLogIn } from '../api/login';

const QUERY_KEY = {
  logIn: 'logIn',
} as const;

export const useLogInQuery: (data: UserData) => UseQueryResult<UserData> = ({ id, pw }: UserData) => {
  return useQuery({
    queryKey: [QUERY_KEY.logIn, id, pw],
    queryFn: () => fetchLogIn({ id, pw }),
    enabled: false,
  });
};
