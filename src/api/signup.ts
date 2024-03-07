import { IData } from '../hooks/useFormState';
import api from '../utils/api';

export const fetchRegisterUser = async (userData: IData<string>) => {
  try {
    const response = await api.post('/signup', userData);
    return response.data;
  } catch (error) {
    alert(error);
    throw error;
  }
};
