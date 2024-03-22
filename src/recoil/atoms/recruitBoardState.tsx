import { atom } from 'recoil';
import { RecruitsTypes } from '../../model/RecruitsTypes';

export const recruitsDataState = atom<RecruitsTypes[]>({
  key: 'recruitsDataState',
  default: [],
});
