import { atom } from 'recoil';
import { ReactElement } from 'react';

const QUERY_KEY = {
  dialog: 'dialog',
} as const;

export const dialogState = atom<null | ReactElement>({
  key: QUERY_KEY.dialog,
  default: null,
});
