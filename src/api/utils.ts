import api from '../utils/api';

export const getAreas = () => {
  return api({ url: '/utils/areas', method: 'get' });
};

export const getField = () => {
  return api({ url: '/utils/field', method: 'get' });
};

export const getSortType = () => {
  return api({ url: '/utils/sortType', method: 'get' });
};

export const upload = (data: FormData) => {
  console.log(upload);
  return api({
    url: '/utils/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
