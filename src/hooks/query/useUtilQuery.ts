import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getRegions, getField, getSortType, upload } from '../../api/utils';

const QUERY_KEY = {
  regions: 'regions',
  upload: 'upload',
  fields: 'fields',
  sortType: 'sortType',
} as const;

interface RegionsResponse {
  results: { code: string; label: string }[];
}

export const useFetchRegions: () => UseQueryResult<RegionsResponse> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.regions],
    queryFn: getRegions,
    select: (data) => data.data,
  });
};

interface FieldResponse {
  results: { code: string; label: string }[];
}

export const useFetchFields: () => UseQueryResult<FieldResponse> = () => {
  return useQuery({
    queryKey: [QUERY_KEY.fields],
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
