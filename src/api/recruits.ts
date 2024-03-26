import api from '../utils/api';

export const getLatestRecruits = () => {
  return api({ url: '/recruits/latest', method: 'get' });
};

// 공고 게시글 조회
export const getRecruits = (params: { userId: number }) => {
  return api({ url: '/recruits', params });
};
