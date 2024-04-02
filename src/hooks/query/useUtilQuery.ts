import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getAreas, getField, getSortType, upload } from '../../api/utils';

const QUERY_KEY = {
  areas: 'areas',
  upload: 'upload',
  field: 'field',
  sortType: 'sortType',
} as const;

interface AreasResponse {
  results: { code: string; label: string }[];
}

export const useFetchAreas: () => UseQueryResult<AreasResponse> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.areas],
    queryFn: getAreas,
    select: (data) => data.data,
  });
};

interface FieldResponse {
  results: { code: string; label: string }[];
}

export const useFetchField: () => UseQueryResult<FieldResponse> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.field],
    queryFn: getField,
    select: (data) => data.data,
  });
};

interface SortTypeResponse {
  results: { code: string; label: string }[];
}

export const useFetchSortType: () => UseQueryResult<SortTypeResponse> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.sortType],
    queryFn: getSortType,
    select: (data) => data.data,
  });
};

interface UploadResponse {
  fileUrl: string;
}

export const useUpload: () => UseMutationResult<AxiosResponse<UploadResponse>, AxiosError, File> = () =>
  useMutation({
    mutationFn: async (file: File): Promise<AxiosResponse<UploadResponse>> => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await upload(formData);

      return response;
    },
  });
