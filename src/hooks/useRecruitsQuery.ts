import { useEffect } from 'react';
import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { IData } from './useFormState';
import { getRecruits, getDetailRecruits, postRecruits, updateRecruits, deleteRecruits } from '../api/recruits';
import { RecruitsResponseTypes, RecruitsTypes, RecruitsPostTypes, RecruitsUpdataTypes } from '../model/RecruitsTypes';
import { recruitsDataState } from '../recoil/atoms/recruitBoardState';

const QUERY_KEY = {
  recruits: 'recruits',
} as const;

export const useFetchRecruits: () => UseQueryResult<RecruitsResponseTypes> = () => {
  const setRecruitsDataState = useSetRecoilState(recruitsDataState);

  const query = useQuery({
    queryKey: [QUERY_KEY.recruits],
    queryFn: getRecruits,
  });

  useEffect(() => {
    if (query.data) {
      setRecruitsDataState(query.data.data.results);
    }
  }, [query]);

  return query;
};

export const useFetchDetailRecruits: (id: number) => UseQueryResult<RecruitsTypes> = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.recruits, id],
    queryFn: () => getDetailRecruits(id),
    select: (data) => {
      return data.data;
    },
  });
};

export const useRegisterRecruits: () => UseMutationResult<
  AxiosResponse<RecruitsPostTypes>,
  AxiosError,
  { title: string; content: string }
> = () =>
  useMutation<AxiosResponse<RecruitsPostTypes>, AxiosError, { title: string; content: string }>({
    mutationFn: postRecruits,
  });

export const useUpdateRecruits: () => UseMutationResult<
  AxiosResponse<RecruitsUpdataTypes>,
  AxiosError,
  RecruitsUpdataTypes
> = () =>
  useMutation<AxiosResponse<RecruitsUpdataTypes>, AxiosError, RecruitsUpdataTypes>({
    mutationFn: ({ id, data }) => updateRecruits(id, data),
  });

export const useDeleteRecruits: () => UseMutationResult<
  AxiosResponse<IData<string>>,
  AxiosError,
  { id: number }
> = () =>
  useMutation<AxiosResponse<IData<string>>, AxiosError, { id: number }>({
    mutationFn: ({ id }) => deleteRecruits(id),
  });
