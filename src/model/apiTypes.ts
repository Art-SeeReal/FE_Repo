import { IData } from '../hooks/useFormState';

export interface ImageTypes {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  location: {
    code: string;
    label: string;
  };
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

export interface RecruitsTypes {
  id: number;
  name: string;
  title: string;
  location: {
    code: string;
    label: string;
  };
  field: string;
  RegDate: string;
  content: string;
}

export interface RecruitsResponseTypes {
  data: {
    results: RecruitsTypes[];
  };
}

export interface RecruitsPostTypes {
  title: string;
  content: string;
}

export interface RecruitsUpdataTypes {
  id: number;
  data: IData<string>;
}

export interface RequestFindIdTypes {
  name: string;
  email: string;
}
export interface RequestFindPwTypes {
  name: string;
  id: string;
  email: string;
}
export interface LoginData {
  id: string;
  pw: string;
}

export interface LoginResponse {
  success: boolean;
}

export interface SignupData {
  name: string;
  nickName: string;
  email: string;
  pw: string;
  pwCheck: string;
  phoneNum: string;
  location: string;
}
