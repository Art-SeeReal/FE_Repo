import { atom } from 'recoil';
import { ReactElement } from 'react';

const STATE_KEY = {
  dialog: 'dialog',
} as const;

export const dialogState = atom<null | ReactElement>({
  key: STATE_KEY.dialog,
  default: null,
});
