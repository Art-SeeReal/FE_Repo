import api from '../utils/api';
import { loginResponse, loginData } from '../model/UserTypes';

export const fetchLogin = async ({ id, pw }: loginData): Promise<loginResponse> => {
  try {
    const response = await api.get('/login', { params: { id, pw } });
    return response.data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};
