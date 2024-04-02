import api from '../utils/api';
import {
  DeleteRecruitsResponse,
  GetDetailRecruitsResponse,
  GetRecruitsRequest,
  GetRecruitsResponse,
  PostRecruitsResponse,
  PostRecruitsRequest,
  PutRecruitsResponse,
  PutRecruitsRequest,
  PostRecruitsScrapResponse,
  DeleteRecruitsScrapResponse,
} from '../model/apiTypes';

export const getLatestRecruits = () => {
  return api({ url: '/recruits/latest', method: 'get' });
};

export const getRecruits = (params: GetRecruitsRequest) => {
  return api<GetRecruitsResponse>({ url: '/recruits', method: 'get', params });
};

export const addRecruit = (data: PostRecruitsRequest) => {
  return api<PostRecruitsResponse>({ url: `/recruits`, method: 'post', data });
};

export const getDetailRecruit = (id: number) => {
  return api<GetDetailRecruitsResponse>({ url: `/recruits/${id}`, method: 'get' });
};

export const updateRecruit = (data: PutRecruitsRequest) => {
  return api<PutRecruitsResponse>({ url: `/recruits/${data.id}`, method: 'put', data });
};

export const deleteRecruit = (id: number) => {
  return api<DeleteRecruitsResponse>({ url: `/recruits/${id}`, method: 'delete' });
};

export const addRecruitScrap = (id: number) => {
  return api<PostRecruitsScrapResponse>({ url: `/recruits/${id}/scrap`, method: 'post' });
};

export const deleteRecruitScrap = (id: number) => {
  return api<DeleteRecruitsScrapResponse>({ url: `/recruits/${id}/scrap`, method: 'post' });
};
