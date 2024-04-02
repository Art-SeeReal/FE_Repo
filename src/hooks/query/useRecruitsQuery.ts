import { useQuery, useMutation, UseQueryResult } from '@tanstack/react-query';
import {
  getRecruits,
  getDetailRecruit,
  addRecruit,
  updateRecruit,
  deleteRecruit,
  addRecruitScrap,
  deleteRecruitScrap,
} from '../../api/recruit';
import {
  GetRecruitsRequest,
  GetRecruitsResponse,
  PostRecruitsRequest,
  GetDetailRecruitsResponse,
  PutRecruitsRequest,
} from '../../model/apiTypes';

const QUERY_KEY = {
  recruits: 'recruits',
} as const;

export const useFetchRecruits = (params: GetRecruitsRequest): UseQueryResult<GetRecruitsResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.recruits],
    queryFn: () => getRecruits(params),
    select: (data) => data.data,
  });
};

export const useFetchDetailRecruits: (id: number) => UseQueryResult<GetDetailRecruitsResponse> = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.recruits, id],
    queryFn: () => getDetailRecruit(id),
    select: (data) => data.data,
  });
};

export const useRegisterRecruits = () => {
  return useMutation({
    mutationFn: (data: PostRecruitsRequest) => addRecruit(data),
  });
};

export const useUpdateRecruits = () => {
  return useMutation({
    mutationFn: (data: PutRecruitsRequest) => updateRecruit(data),
  });
};

export const useDeleteRecruits = () => {
  return useMutation({
    mutationFn: (id: number) => deleteRecruit(id),
  });
};

export const useAddRecruitsScrap = () => {
  return useMutation({
    mutationFn: (id: number) => addRecruitScrap(id),
  });
};

export const useDeleteRecruitsScrap = () => {
  return useMutation({
    mutationFn: (id: number) => deleteRecruitScrap(id),
  });
};
