import api from '../utils/api';

export const getAreas = () => {
  return api({ url: '/utils/areas', method: 'get' });
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
