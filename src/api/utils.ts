import api from '../utils/api';

export const getAreas = () => {
  return api({ url: '/utils/areas', method: 'get' });
};
