import { useQuery, UseQueryResult } from 'react-query';
import { getBanners } from '../api/banners';

const QUERY_KEY = {
  banners: 'banners',
} as const;

interface ResponseData {
  results: { id: number; imageUrl: string }[];
  count: number;
}

export const useFetchBanners: () => UseQueryResult<ResponseData> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.banners],
    queryFn: getBanners,
    staleTime: 60 * 1000 * 30,
  });
};
