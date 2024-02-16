import api from '../utils/api';
import { UserData } from '../model/UserTypes';

export const fetchLogIn = async ({ id, pw }: UserData): Promise<UserData> => {
  const response = await api.get('/login', { params: { id, pw } });
  return response.data;
};
