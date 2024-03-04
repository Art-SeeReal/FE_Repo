import { atom } from 'recoil';
import { ImageData } from '../../model/ArtistTypes';

export const artistState = atom<ImageData[]>({
  key: 'artistState',
  default: [],
});

export const selectedAreasState = atom<string[]>({
  key: 'selectedAreasState',
  default: [],
});
