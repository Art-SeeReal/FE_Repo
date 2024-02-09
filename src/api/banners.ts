import api from '../utils/api';

export const getBanners = () => {
  return api({ url: '/banners', method: 'get' });
};
