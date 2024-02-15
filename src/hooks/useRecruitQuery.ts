import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLatestRecruits } from '../api/recruits';

const QUERY_KEY = {
  recruits: 'recruits',
} as const;

interface ResponseData {
  results: { id: number; imageUrl: string; title: string }[];
  count: number;
}

export const useFetchLatestRecruits: () => UseQueryResult<ResponseData> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.recruits],
    queryFn: getLatestRecruits,
  });
};
