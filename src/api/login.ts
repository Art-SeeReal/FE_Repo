import api from '../utils/api';
import { loginResponse, userData } from '../model/UserTypes';

export const fetchLogin = async ({ id, pw }: userData): Promise<loginResponse> => {
  const response = await api.get('/login', { params: { id, pw } });
  return response.data;
};
