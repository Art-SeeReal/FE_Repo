import { atom } from 'recoil';
import { ImageData } from '../../model/ArtistTypes';

export const artistDataState = atom<ImageData[]>({
  key: 'artistDataState',
  default: [],
});

export const selectedAreasState = atom<string[]>({
  key: 'selectedAreasState',
  default: [],
});
