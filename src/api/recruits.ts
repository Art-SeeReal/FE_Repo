import api from '../utils/api';
import { IData } from '../hooks/useFormState';

export const getLatestRecruits = () => {
  return api({ url: '/recruits/latest', method: 'get' });
};

export const getRecruits = () => {
  return api({ url: '/recruits', method: 'get' });
};

export const getDetailRecruits = (id: number) => {
  return api({ url: `/recruits/${id}`, method: 'get' });
};

export const postRecruits = async (data: IData<string>) => {
  const response = await api.post('/recruits', data);
  return response.data;
};

export const updateRecruits = async (id: number, data: IData<string>) => {
  const response = await api.put(`recruits/${id}`, data);
  return response.data;
};

export const deleteRecruits = (id: number) => {
  return api({ url: `/recruits/${id}`, method: 'delete' });
};
