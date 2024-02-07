import { SignUp } from '../model/UserTypes';
import api from '../utils/api';

export const registerUser = async (userData: SignUp) => {
  try {
    const response = await api.post('/signup', userData);
    return response.data;
  } catch (error) {
    alert('회원가입 실패');
    throw error;
  }
};
