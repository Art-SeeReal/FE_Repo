export interface GetPortfoliosRequest {
  page: number;
  fields?: string[];
  sortType?: string;
  keyWords?: string;
}

export interface GetPortfoliosResponse {
  results: {
    id: number;
    imageUrl: string;
    title: string;
    artist: string;
    fields: {
      code: string;
      label: string;
    };
    isScrap: boolean;
    like: number;
    view: number;
    RegDate: string;
    content: string;
  }[];
  count: number;
}

export interface GetDetailPortfoliosResponse {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  fields: {
    code: string;
    label: string;
  };
  isScrap: boolean;
  like: number;
  view: number;
  RegDate: string;
  content: string;
}

export interface PostPortfoliosRequest {
  title: string;
  content: string;
}

export interface PutPortfoliosRequest {
  id: number;
  data: { title: string; content: string; fields: string[] };
}
