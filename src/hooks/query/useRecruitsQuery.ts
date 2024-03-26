import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getRecruits, getDetailRecruit, addRecruit, updateRecruit, deleteRecruit } from '../../api/recruit';
import {
  GetRecruitsRequest,
  GetRecruitsResponse,
  PostPortfolioResponse,
  PostPortfolioRequest,
  GetDetailRecruitsResponse,
  PutRecruitsResponse,
  PutRecruitsRequest,
  DeleteRecruitsResponse,
} from '../../model/apiTypes';

const QUERY_KEY = {
  recruits: 'recruits',
} as const;

export const useFetchRecruits = (params: GetRecruitsRequest): UseQueryResult<GetRecruitsResponse, AxiosError> => {
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

export const useRegisterRecruits: () => UseMutationResult<
  AxiosResponse<PostPortfolioResponse>,
  AxiosError,
  PostPortfolioRequest
> = () =>
  useMutation<AxiosResponse<PostPortfolioResponse>, AxiosError, PostPortfolioRequest>({
    mutationFn: (data) => addRecruit(data),
  });

export const useUpdateRecruits: () => UseMutationResult<
  AxiosResponse<PutRecruitsResponse>,
  AxiosError,
  PutRecruitsRequest
> = () =>
  useMutation<AxiosResponse<PutRecruitsResponse>, AxiosError, PutRecruitsRequest>({
    mutationFn: (data) => updateRecruit(data),
  });

export const useDeleteRecruits: () => UseMutationResult<
  AxiosResponse<DeleteRecruitsResponse>,
  AxiosError,
  { id: number }
> = () =>
  useMutation<AxiosResponse<DeleteRecruitsResponse>, AxiosError, { id: number }>({
    mutationFn: ({ id }) => deleteRecruit(id),
  });
