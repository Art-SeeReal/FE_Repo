import { IData } from '../hooks/useFormState';

export interface ImageTypes {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  location: {
    code: string;
    label: string;
  }
  field: string;
  like: number;
  view: number;
  RegDate: string;
}

export interface PortfolioTypes extends ImageTypes {
  content: string;
}

export interface RegisterPortfolioTypes {
  title: string;
  content: string;
}

export interface PortfolioImagesComponentProps {
  image: ImageTypes;
}

export interface PortfoilioUpdataTypes {
  id: number;
  userData: IData<string>;
}

export interface PortfolioResponseTypes {
  data: {
    results: PortfolioTypes[];
  };
}
