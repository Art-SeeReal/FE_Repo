import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { FindIdTypes, FindPwTypes } from '../model/UserTypes';

const fetchFindId = async ({ name, email }: FindIdTypes): Promise<{ id: string }> => {
  const response = await api.get('/findId', { params: { name, email } });
  return response.data;
};

export const useFindIdQuery = ({ name, email }: FindIdTypes) => {
  return useQuery({
    queryKey: ['FIND_ID', name, email],
    queryFn: () => fetchFindId({ name, email }),
    enabled: false,
  });
};

const fetchFindPw = async ({ name, email, id }: FindPwTypes): Promise<{ password: string }> => {
  const response = await api.get('/findPw', { params: { name, email, id } });
  return response.data;
};

export const useFindPwQuery = ({ name, email, id }: FindPwTypes) => {
  return useQuery({
    queryKey: ['FIND_PW', name, email, id],
    queryFn: () => fetchFindPw({ name, email, id }),
    enabled: false,
  });
};
