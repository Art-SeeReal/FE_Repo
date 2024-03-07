import { selector } from 'recoil';
import { artistDataState, selectedAreasState } from '../atoms/artistBoardState';

const ALL_COUNTRY = 'Q000';

export const artistDataSelector = selector({
  key: 'artistDataSelector',
  get: ({ get }) => {
    const artistDataStates = get(artistDataState);
    const selectedAreas = get(selectedAreasState);

    return selectedAreas.length === 1 && selectedAreas[0] === ALL_COUNTRY
      ? artistDataStates
      : artistDataStates.filter(({ location }) => selectedAreas.includes(location));
  },
});
