import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getPortfolios, updatePortfolio, deletePortfolio, getDetailPortfolio } from '../../api/portfolio';
import { addPortfolio } from '../../api/portfolio';
import {
  GetPortfoliosRequest,
  GetPortfoliosResponse,
  PostPortfolioRequest,
  PostPortfolioResponse,
  GetDetailPortfoliosResponse,
  PutPortfolioRequest,
  PutPortfolioResponse,
  DeletePortfolioResponse,
} from '../../model/apiTypes';

const QUERY_KEY = {
  portfolio: 'portfolio',
} as const;

export const useFetchPortfolios = (params: GetPortfoliosRequest): UseQueryResult<GetPortfoliosResponse, AxiosError> => {
  return useQuery({
    queryKey: [QUERY_KEY.portfolio],
    queryFn: () => getPortfolios(params),
  });
};

export const useRegisterPortfolio: () => UseMutationResult<
  AxiosResponse<PostPortfolioResponse>,
  AxiosError,
  PostPortfolioRequest
> = () =>
  useMutation<AxiosResponse<PostPortfolioResponse>, AxiosError, PostPortfolioRequest>({
    mutationFn: (data) => addPortfolio(data),
  });

export const useFetchDetailPortfolio: (id: number) => UseQueryResult<GetDetailPortfoliosResponse> = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.portfolio, id],
    queryFn: () => getDetailPortfolio(id),
    select: (data) => {
      return data.data;
    },
  });
};

export const useUpdatePortfolio: () => UseMutationResult<
  AxiosResponse<PutPortfolioResponse>,
  AxiosError,
  PutPortfolioRequest
> = () =>
  useMutation<AxiosResponse<PutPortfolioResponse>, AxiosError, PutPortfolioRequest>({
    mutationFn: (data) => updatePortfolio(data),
  });

export const useDeletePortfolio: () => UseMutationResult<
  AxiosResponse<DeletePortfolioResponse>,
  AxiosError,
  { id: number }
> = () =>
  useMutation<AxiosResponse<DeletePortfolioResponse>, AxiosError, { id: number }>({
    mutationFn: ({ id }) => deletePortfolio(id),
  });
