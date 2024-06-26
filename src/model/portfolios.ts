export interface GetPortfoliosRequest {
  page: number;
  fields?: string[];
  sortType?: string;
  keyWords?: string;
}

export interface PortfoliosTypes {
  id: number;
  imageUrl: string;
  title: string;
  nickname: string;
  fields: {
    code: string;
    label: string;
  };
  isScrap: boolean;
  isLike: boolean;
  userId: string;
}

export interface GetPortfoliosResponse {
  results: PortfoliosTypes[];
  count: number;
}

export interface GetDetailPortfoliosResponse {
  id: number;
  imageUrl: string;
  title: string;
  nickname: string;
  fields: {
    code: string;
    label: string;
  };
  isScrap: boolean;
  isLike: boolean;
  userId: string;
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
