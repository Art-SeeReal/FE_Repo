import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { UserData } from '../model/UserTypes';

const fetchLogIn =  async ({ id, pw }: UserData): Promise<UserData> => {
  console.log(id, pw);
  const response = await api.get('/login', { params: { id, pw } });
  console.log(response.data);
  return response.data;
};

export const useLoginQuery = ({ id, pw }: UserData) => {
  return useQuery({
    queryKey: ['LOG_IN', id, pw],
    queryFn: () => fetchLogIn({ id, pw }),
    enabled: false,
  });
};
