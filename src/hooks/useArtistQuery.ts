import { useQuery, UseQueryResult } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { getArtist } from '../api/artist';
import { artistState } from '../recoil/atoms/artistBoardState';

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
  const setArtistDataState = useSetRecoilState(artistState);

  return useQuery({
    queryKey: [QUERY_KEY.artist],
    queryFn: getArtist,
    onSuccess: (data: ResponseData) => {
      setArtistDataState(data.results);
    },
  });
};
