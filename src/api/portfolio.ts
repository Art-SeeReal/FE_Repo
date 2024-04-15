import api from '../utils/api';
import {
  PostPortfoliosRequest,
  GetPortfoliosRequest,
  PutPortfoliosRequest,
  GetPortfoliosResponse,
  GetDetailPortfoliosResponse,
} from '../model/portfolios';

export const getPortfolios = (params: GetPortfoliosRequest) => {
  return api<GetPortfoliosResponse>({ url: '/portfolios', method: 'get', params });
};

export const addPortfolio = (data: PostPortfoliosRequest) => {
  return api({ url: '/portfolios', method: 'post', data });
};

export const getDetailPortfolio = (id: number) => {
  return api<GetDetailPortfoliosResponse>({ url: `/portfolios/${id}`, method: 'get' });
};

export const updatePortfolio = (data: PutPortfoliosRequest) => {
  return api({ url: `/portfolios/${data.id}`, method: 'put', data });
};

export const deletePortfolio = (id: number) => {
  return api({ url: `/portfolios/${id}`, method: 'delete' });
};

export const addPortfolioScrap = (id: number) => {
  return api({ url: `/portfolios/${id}/scrap`, method: 'post' });
};

export const deletePortfolioScrap = (id: number) => {
  return api({ url: `/portfolios/${id}/scrap`, method: 'post' });
};

export const getLatestPortfolios = () => {
  return api({ url: '/portfolios/latest', method: 'get' });
};
