import { selector } from 'recoil';
import { portfolioDataState, selectedAreasState } from '../atoms/portfolioBoardState';

const ALL_COUNTRY = 'Q000';

export const portfolioDataSelector = selector({
  key: 'portfolioDataSelector',
  get: ({ get }) => {
    const portfolioDataStates = get(portfolioDataState);
    const selectedAreas = get(selectedAreasState);

    return selectedAreas.length === 1 && selectedAreas[0] === ALL_COUNTRY
      ? portfolioDataStates
      : portfolioDataStates.filter(({ location: { code } }) => selectedAreas.includes(code));
  },
});
