import api from '../utils/api';

export const getRegions = () => {
  return api({ url: '/utils/regions', method: 'get' });
};

export const getField = () => {
  return api({ url: '/utils/fields', method: 'get' });
};

export const upload = (data: FormData) => {
  return api({
    url: '/utils/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getPresignedUrl = (file: File) => {
  return api({
    url: '/utils/presignedUrl',
    method: 'post',
    data: { filename: file.name },
  });
};

export const uploadS3 = (url: string, file: File) => {
  return api({
    url,
    method: 'put',
    data: { filename: file.name },
  });
};
