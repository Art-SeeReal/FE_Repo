import { atom } from 'recoil';

export const UserState = atom<boolean>({
  key: 'UserState',
  default: false,
});
