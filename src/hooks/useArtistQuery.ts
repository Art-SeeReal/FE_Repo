import { useQuery, UseQueryResult } from 'react-query';
import { getArtist } from '../api/artist';

const QUERY_KEY = {
  artist: 'artist',
} as const;

interface ResponseData {
  results: {
    id: number;
    imageUrl: string;
    title: string;
    artist: string;
    location: string;
    field: string;
    like: number;
    view: number;
    RegDate: string;
  }[];
}

export const useFetchArtist: () => UseQueryResult<ResponseData> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.artist],
    queryFn: getArtist,
  });
};
