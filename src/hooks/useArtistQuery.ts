import { useEffect } from 'react';
import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { getArtist } from '../api/artist';
import { artistDataState } from '../recoil/atoms/artistBoardState';
import { fetchRegisterArtist } from '../api/artist';
import { ImageData, RegisterArtistData } from '../model/ArtistTypes';
import { getDetailArtist } from '../api/artist';

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

export const useRegisterArtist: () => UseMutationResult<
  AxiosResponse<RegisterArtistData>,
  AxiosError,
  { title: string; content: string }
> = () =>
  useMutation<AxiosResponse<RegisterArtistData>, AxiosError, { title: string; content: string }>({
    mutationFn: fetchRegisterArtist,
  });

export const useFetchArtistDetails: (id: number) => UseQueryResult<ImageData> = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.artist, id],
    queryFn: () => getDetailArtist(id),
  });
};
