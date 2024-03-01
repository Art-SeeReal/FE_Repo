import { IData } from '../hooks/useFormState';
import api from '../utils/api';

export const fetchRegisterArtist = async (userData: IData<string>) => {
  try {
    const response = await api.post('/artist/register', userData);
    return response.data;
  } catch (error) {
    alert(error);
    throw error;
  }
};
