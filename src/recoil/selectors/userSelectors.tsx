import { selector } from 'recoil';
import { UserState } from '../atoms/userState';

export const IsUserLoggedInSelector = selector({
  key: 'IsUserLoggedInSelector',
  get: ({ get }) => {
    const userLoggedIn = get(UserState);
    return userLoggedIn;
  },
});
