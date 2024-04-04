import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const TOKEN_KEY = 'User-Token';

export const setToken = (token: string) => {
  return cookies.set(TOKEN_KEY, token);
};

export const getToken = () => {
  return cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  return cookies.remove(TOKEN_KEY);
};
