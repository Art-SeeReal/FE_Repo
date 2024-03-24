import { atom } from 'recoil';
import { RecruitsTypes } from '../../model/apiTypes';

export const recruitsDataState = atom<RecruitsTypes[]>({
  key: 'recruitsDataState',
  default: [],
});
