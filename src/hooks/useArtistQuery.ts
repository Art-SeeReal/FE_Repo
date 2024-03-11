import { useEffect } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { getArtist } from '../api/artist';
import { artistDataState } from '../recoil/atoms/artistBoardState';

const QUERY_KEY = {
  artist: 'artist',
} as const;

interface ResponseData {
  data: {
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
  };
}

export const useFetchArtist: () => UseQueryResult<ResponseData> = () => {
  const setArtistDataState = useSetRecoilState(artistDataState);

  const query = useQuery({
    queryKey: [QUERY_KEY.artist],
    queryFn: getArtist,
  });

  useEffect(() => {
    if (query.data) {
      setArtistDataState(query.data.data.results);
    }
  }, [query]);

  return query;
};
