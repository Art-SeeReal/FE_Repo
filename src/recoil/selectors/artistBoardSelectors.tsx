import { selector } from 'recoil';
import { artistState, selectedAreasState } from '../atoms/artistBoardState';

const ALL_COUNTRY = 'Q000';

export const artistDataSelector = selector({
  key: 'artistDataSelector',
  get: ({ get }) => {
    const selectedAreas = get(selectedAreasState);
    const artistDataState = get(artistState);
    return selectedAreas.length === 1 && selectedAreas[0] === ALL_COUNTRY
      ? artistDataState
      : artistDataState.filter(({ location }) => selectedAreas.includes(location));
  },
});
