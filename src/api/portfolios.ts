import api from '../utils/api';

export const getLatestPortfolios = () => {
  return api({ url: '/portfolios/latest', method: 'get' });
};
