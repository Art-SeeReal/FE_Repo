import { useEffect } from 'react';
import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { getPortfolio, updatePortfolio, deletePortfolio, getDetailPortfolio, postPortfolio } from '../../api/portfolio';
import { portfolioDataState } from '../../recoil/atoms/portfolioBoardState';
import { IData } from '../customs/useFormState';
import {
  PortfolioResponseTypes,
  PortfolioTypes,
  RegisterPortfolioTypes,
  PortfoilioUpdataTypes,
} from '../../model/PortfolioTypes';

const QUERY_KEY = {
  portfolio: 'portfolio',
} as const;

export const useFetchPortfolio: () => UseQueryResult<PortfolioResponseTypes> = () => {
  const setPortfolioDataState = useSetRecoilState(portfolioDataState);

  const query = useQuery({
    queryKey: [QUERY_KEY.portfolio],
    queryFn: getPortfolio,
  });

  useEffect(() => {
    if (query.data) {
      setPortfolioDataState(query.data.data.results);
    }
  }, [query]);

  return query;
};

export const useRegisterPortfolio: () => UseMutationResult<
  AxiosResponse<RegisterPortfolioTypes>,
  AxiosError,
  { title: string; content: string }
> = () =>
  useMutation<AxiosResponse<RegisterPortfolioTypes>, AxiosError, { title: string; content: string }>({
    mutationFn: postPortfolio,
  });

export const useFetchDetailPortfolio: (id: number) => UseQueryResult<PortfolioTypes> = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.portfolio, id],
    queryFn: () => getDetailPortfolio(id),
    select: (data) => {
      return data.data;
    },
  });
};

export const useUpdatePortfolio: () => UseMutationResult<
  AxiosResponse<PortfoilioUpdataTypes>,
  AxiosError,
  PortfoilioUpdataTypes
> = () =>
  useMutation<AxiosResponse<PortfoilioUpdataTypes>, AxiosError, PortfoilioUpdataTypes>({
    mutationFn: ({ id, userData }) => updatePortfolio(id, userData),
  });

export const useDeletePortfolio: () => UseMutationResult<
  AxiosResponse<IData<string>>,
  AxiosError,
  { id: number }
> = () =>
  useMutation<AxiosResponse<IData<string>>, AxiosError, { id: number }>({
    mutationFn: ({ id }) => deletePortfolio(id),
  });
