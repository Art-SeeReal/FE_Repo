import { useQuery, useMutation, UseQueryResult } from '@tanstack/react-query';
import {
  addPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,
  getDetailPortfolio,
  addPortfolioScrap,
  deletePortfolioScrap,
} from '../../api/portfolio';
import {
  GetPortfoliosRequest,
  GetPortfoliosResponse,
  PostPortfolioRequest,
  GetDetailPortfoliosResponse,
  PutPortfolioRequest,
} from '../../model/apiTypes';

const QUERY_KEY = {
  portfolio: 'portfolio',
} as const;

export const useFetchPortfolios = (params: GetPortfoliosRequest): UseQueryResult<GetPortfoliosResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.portfolio],
    queryFn: () => getPortfolios(params),
    select: (data) => data.data,
  });
};

export const useRegisterPortfolio = () => {
  return useMutation({
    mutationFn: (data: PostPortfolioRequest) => addPortfolio(data),
  });
};

export const useFetchDetailPortfolio: (id: number) => UseQueryResult<GetDetailPortfoliosResponse> = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.portfolio, id],
    queryFn: () => getDetailPortfolio(id),
    select: (data) => data.data,
  });
};

export const useUpdatePortfolio = () => {
  return useMutation({
    mutationFn: (data: PutPortfolioRequest) => updatePortfolio(data),
  });
};

export const useDeletePortfolio = () => {
  return useMutation({
    mutationFn: (id: number) => deletePortfolio(id),
  });
};

export const useAddPortfolioScrap = () => {
  return useMutation({
    mutationFn: (id: number) => addPortfolioScrap(id),
  });
};

export const useDeletePortfolioScrap = () => {
  return useMutation({
    mutationFn: (id: number) => deletePortfolioScrap(id),
  });
};
