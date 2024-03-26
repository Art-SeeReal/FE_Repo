import { selector } from 'recoil';
import { userState } from '../atoms/userState';

const SELECTOR_KEY = {
  isLogin: 'isLogin',
} as const;

export const isLoginSelector = selector({
  key: SELECTOR_KEY.isLogin,
  get: ({ get }) => {
    const { token } = get(userState);
    return !!token;
  },
});
