import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchFindId, fetchFindPw } from '../api/findIdPw';
import { RequestFindIdTypes, RequestFindPwTypes } from '../model/UserTypes';

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
