import { RequestFindIdTypes, RequestFindPwTypes } from '../model/UserTypes';
import api from '../utils/api';

export const fetchFindId = async ({ name, email }: RequestFindIdTypes): Promise<{ success: boolean }> => {
  try {
    const response = await api.get('/findId', { params: { name, email } });
    return response.data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};

export const fetchFindPw = async ({ name, id, email }: RequestFindPwTypes): Promise<{ success: boolean }> => {
  try {
    const response = await api.get('/findPw', { params: { name, id, email } });
    return response.data;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};
