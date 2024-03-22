import { selector } from 'recoil';
import { recruitsDataState } from '../atoms/recruitBoardState';

export const recruitsDataSelector = selector({
  key: 'recruitsDataSelector',
  get: ({ get }) => {
    const recruitsDataStates = get(recruitsDataState);
    return recruitsDataStates;
  },
});
