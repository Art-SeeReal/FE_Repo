import { useQuery, useMutation, UseQueryResult, UseMutationResult } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getAreas, upload } from '../api/utils';

const QUERY_KEY = {
  areas: 'areas',
  upload: 'upload',
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
