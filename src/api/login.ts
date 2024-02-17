import api from '../utils/api';
import { logInResponse, userData } from '../model/UserTypes';

export const fetchLogin = async ({ id, pw }: userData): Promise<logInResponse> => {
  const response = await api.get('/login', { params: { id, pw } });
  return response.data;
};
