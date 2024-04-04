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
