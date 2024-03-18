import { IData } from '../hooks/useFormState';
import api from '../utils/api';

export const fetchRegisterArtist = async (userData: IData<string>) => {
  const response = await api.post('/artist/register', userData);
  return response.data;
};

export const getArtist = () => {
  return api({ url: '/artist', method: 'get' });
};

export const getDetailArtist = (id: number) => {
  return api({ url: `/artist/${id}`, method: 'get' });
};

export const updateArtist = async (id: number, userData: IData<string>) => {
  const response = await api.put(`artist/${id}`, userData);
  return response.data;
};

export const deleteArtist = (id: number) => {
  return api({ url: `/artist/${id}`, method: 'delete' });
};
