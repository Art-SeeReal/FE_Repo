import { atom } from 'recoil';
import { ImageTypes } from '../../model/PortfolioTypes';

export const portfolioDataState = atom<ImageTypes[]>({
  key: 'portfolioDataState',
  default: [],
});

export const selectedAreasState = atom<string[]>({
  key: 'selectedAreasState',
  default: [],
});
