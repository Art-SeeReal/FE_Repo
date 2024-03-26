import api from '../utils/api';

export const getLatestPortfolios = () => {
  return api({ url: '/portfolios/latest', method: 'get' });
};

// 포트폴리오 게시글 조회
export const getPortfolios = (params: { userId: number }) => {
  return api({ url: '/portfolios', params });
};
