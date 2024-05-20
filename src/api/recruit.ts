import api from '../utils/api';
import {
  GetDetailRecruitsResponse,
  GetRecruitsRequest,
  GetRecruitsResponse,
  PostRecruitsRequest,
  PutRecruitsRequest,
} from '../model/recruits';

export const getLatestRecruits = () => {
  return api({ url: '/recruits/latest', method: 'get' });
};

export const getRecruits = (params: GetRecruitsRequest) => {
  return api<GetRecruitsResponse>({ url: '/recruits', method: 'get', params });
};

export const addRecruit = (data: PostRecruitsRequest) => {
  return api({ url: `/recruits`, method: 'post', data });
};

export const getDetailRecruit = (id: number) => {
  return api<GetDetailRecruitsResponse>({ url: `/recruits/${id}`, method: 'get' });
};

export const updateRecruit = (data: PutRecruitsRequest) => {
  return api({ url: `/recruits/${data.id}`, method: 'put', data });
};

export const deleteRecruit = (id: number) => {
  return api({ url: `/recruits/${id}`, method: 'delete' });
};

export const addRecruitScrap = (id: number) => {
  return api({ url: `/recruits/${id}/scrap`, method: 'post' });
};

export const deleteRecruitScrap = (id: number) => {
  return api({ url: `/recruits/${id}/scrap`, method: 'delete' });
};

export const addRecruitsApply = (id: number) => {
  return api({ url: `/recruits/${id}/apply`, method: 'post' });
};
