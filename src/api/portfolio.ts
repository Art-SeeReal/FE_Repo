import { IData } from '../hooks/useFormState';
import api from '../utils/api';

export const postPortfolio = async (userData: IData<string>) => {
  return api({ url: '/portfolio', method: 'post', data: userData });
};

export const getPortfolios = (page: number) => {
  console.log(page);
  return api({ url: '/portfolios', method: 'get', params: { page } });
};

export const getDetailPortfolio = (id: number) => {
  return api({ url: `/portfolios/${id}`, method: 'get' });
};

export const updatePortfolio = async (id: number, userData: IData<string>) => {
  return api({ url: `/portfolios/${id}`, method: 'put', data: userData });
};

export const deletePortfolio = (id: number) => {
  return api({ url: `/portfolios/${id}`, method: 'delete' });
};

export const getLatestPortfolios = () => {
  return api({ url: '/portfolios/latest', method: 'get' });
};
