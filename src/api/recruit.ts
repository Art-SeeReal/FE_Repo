import api from '../utils/api';
import { IData } from '../hooks/useFormState';

export const getLatestRecruits = () => {
  return api({ url: '/recruits/latest', method: 'get' });
};

export const getRecruits = () => {
  return api({ url: '/recruits', method: 'get' });
};

export const getDetailRecruit = (id: number) => {
  return api({ url: `/recruit/${id}`, method: 'get' });
};

export const postRecruit = async (data: IData<string>) => {
  return api({ url: `/recruit`, method: 'post', data });
};

export const updateRecruit = async (id: number, data: IData<string>) => {
  return api({ url: `/recruit/${id}`, method: 'put', data });
};

export const deleteRecruit = (id: number) => {
  return api({ url: `/recruit/${id}`, method: 'delete' });
};
