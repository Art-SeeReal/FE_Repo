import { useQuery, UseQueryResult } from 'react-query';
import { getAreas } from '../api/utils';

const QUERY_KEY = {
  areas: 'areas',
} as const;

interface ResponseData {
  results: { code: string; label: string }[];
}

export const useFetchAreas: () => UseQueryResult<ResponseData> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.areas],
    queryFn: getAreas,
  });
};
