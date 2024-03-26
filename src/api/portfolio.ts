import api from '../utils/api';
import {
  PostPortfolioRequest,
  PostPortfolioResponse,
  GetPortfoliosRequest,
  PutPortfolioRequest,
  GetPortfoliosResponse,
  GetDetailPortfoliosResponse,
  PutPortfolioResponse,
  DeletePortfolioResponse,
} from '../model/apiTypes';

export const getPortfolios = (params: GetPortfoliosRequest) => {
  return api<GetPortfoliosResponse>({ url: '/portfolios', method: 'get', params });
};

export const addPortfolio = (data: PostPortfolioRequest) => {
  return api<PostPortfolioResponse>({ url: '/portfolio', method: 'post', data });
};

export const getDetailPortfolio = (id: number) => {
  return api<GetDetailPortfoliosResponse>({ url: `/portfolios/${id}`, method: 'get' });
};

export const updatePortfolio = (data: PutPortfolioRequest) => {
  return api<PutPortfolioResponse>({ url: `/portfolios/${data.id}`, method: 'put', data });
};

export const deletePortfolio = (id: number) => {
  return api<DeletePortfolioResponse>({ url: `/portfolios/${id}`, method: 'delete' });
};

export const getLatestPortfolios = () => {
  return api({ url: '/portfolios/latest', method: 'get' });
};
