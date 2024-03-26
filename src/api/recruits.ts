import api from '../utils/api';

export const getLatestRecruits = () => {
  return api({ url: '/recruits/latest', method: 'get' });
};
