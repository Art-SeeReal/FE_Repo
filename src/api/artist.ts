import api from '../utils/api';

export const getArtist = () => {
  return api({ url: '/artist', method: 'get' });
};
