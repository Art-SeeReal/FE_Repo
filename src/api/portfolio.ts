import { IData } from '../hooks/customs/useFormState';
import api from '../utils/api';

export const postPortfolio = async (userData: IData<string>) => {
  const response = await api.post('/portfolio/register', userData);
  return response.data;
};

export const getPortfolio = () => {
  return api({ url: '/portfolio', method: 'get' });
};

export const getDetailPortfolio = (id: number) => {
  return api({ url: `/portfolio/${id}`, method: 'get' });
};

export const updatePortfolio = async (id: number, userData: IData<string>) => {
  const response = await api.put(`portfolio/${id}`, userData);
  return response.data;
};

export const deletePortfolio = (id: number) => {
  return api({ url: `/portfolio/${id}`, method: 'delete' });
};
