import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLatestPortfolios } from '../api/portfolios';

const QUERY_KEY = {
  portfolios: 'portfolios',
} as const;

interface ResponseData {
  results: { id: number; imageUrl: string; title: string }[];
  count: number;
}

export const useFetchLatestPortfolios: () => UseQueryResult<ResponseData> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.portfolios],
    queryFn: getLatestPortfolios,
  });
};
