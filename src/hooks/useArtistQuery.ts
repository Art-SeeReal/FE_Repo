import { useEffect } from 'react';
import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { getArtist, updateArtist, deleteArtist } from '../api/artist';
import { artistDataState } from '../recoil/atoms/artistBoardState';
import { fetchRegisterArtist } from '../api/artist';
import { RegisterArtistData } from '../model/ArtistTypes';
import { getDetailArtist } from '../api/artist';
import { IData } from './useFormState';

const QUERY_KEY = {
  artist: 'artist',
} as const;

interface ArtistData {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  location: string;
  field: string;
  like: number;
  view: number;
  RegDate: string;
  content: string;
}

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
      content: string;
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

export const useFetchArtistDetails: (id: number) => UseQueryResult<ArtistData> = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.artist, id],
    queryFn: () => getDetailArtist(id),
    select: (data) => {
      return data.data;
    },
  });
};

export const useUpdateArtist: () => UseMutationResult<
  AxiosResponse<IData<string>>,
  AxiosError,
  { id: number; userData: IData<string> }
> = () =>
  useMutation<AxiosResponse<IData<string>>, AxiosError, { id: number; userData: IData<string> }>({
    mutationFn: (variables) => updateArtist(variables.id, variables.userData),
  });

export const useDeleteArtist: () => UseMutationResult<AxiosResponse<IData<string>>, AxiosError, { id: number }> = () =>
  useMutation<AxiosResponse<IData<string>>, AxiosError, { id: number }>({
    mutationFn: (variables) => deleteArtist(variables.id),
  });
