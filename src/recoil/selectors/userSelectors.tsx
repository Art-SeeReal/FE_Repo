import { selector } from 'recoil';
import { userState } from '../atoms/userState';

export const IsUserLoggedInSelector = selector({
  key: 'IsUserLoggedInSelector',
  get: ({ get }) => {
    const userLoggedIn = get(userState);
    return userLoggedIn;
  },
});
