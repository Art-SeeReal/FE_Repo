import api from '../utils/api';
import {
  DeleteRecruitsResponse,
  GetDetailRecruitsResponse,
  GetRecruitsRequest,
  GetRecruitsResponse,
  PostPortfolioResponse,
  PostRecruitsRequest,
  PutPortfolioResponse,
  PutRecruitsRequest,
} from '../model/apiTypes';

export const getLatestRecruits = () => {
  return api({ url: '/recruits/latest', method: 'get' });
};

export const getRecruits = (params: GetRecruitsRequest) => {
  return api<GetRecruitsResponse>({ url: '/recruits', method: 'get', params });
};

export const addRecruit = (data: PostRecruitsRequest) => {
  return api<PostPortfolioResponse>({ url: `/recruit`, method: 'post', data });
};

export const getDetailRecruit = (id: number) => {
  return api<GetDetailRecruitsResponse>({ url: `/recruit/${id}`, method: 'get' });
};

export const updateRecruit = (data: PutRecruitsRequest) => {
  return api<PutPortfolioResponse>({ url: `/recruit/${data.id}`, method: 'put', data });
};

export const deleteRecruit = (id: number) => {
  return api<DeleteRecruitsResponse>({ url: `/recruit/${id}`, method: 'delete' });
};
