import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { UserData } from '../model/UserTypes';

const login = async ({ id, pw }: UserData): Promise<UserData> => {
  console.log(id, pw);
  const response = await api.get('/login', { params: { id, pw } });
  console.log(response);
  return response.data;
};

export const useLoginQuery = ({ id, pw }: UserData) => {
  return useQuery({
    queryKey: ['login', id],
    queryFn: () => login({ id, pw }),
    enabled: false,
  });
};
