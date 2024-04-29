import { atom } from 'recoil';

const STATE_KEY = {
  mobileNav: 'mobileNav',
} as const;

export const mobileNavState = atom<{ isOpen: boolean }>({
  key: STATE_KEY.mobileNav,
  default: {
    isOpen: false,
  },
});
