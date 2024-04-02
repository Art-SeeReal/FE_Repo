// 포트폴리오 타입

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

export interface PostPortfolioRequest {
  title: string;
  content: string;
}

export interface PostPortfolioResponse {
  success: boolean;
}

export interface PutPortfolioRequest {
  id: number;
  data: { title: string; content: string; fields: string[] };
}

export interface PutPortfolioResponse {
  success: boolean;
}

export interface DeletePortfolioResponse {
  success: boolean;
}

export interface PostPortfolioScrapResponse {
  success: boolean;
}

export interface DeletePortfolioScrapResponse {
  success: boolean;
}

//Recruits타입

export interface GetRecruitsRequest {
  page: number;
  fields?: string[];
  areas?: string[];
  sortType?: string;
  keyWords?: string; 
}

export interface GetRecruitsResponse {
  results: {
    id: number;
    name: string;
    title: string;
    areas: {
      code: string;
      label: string;
    };
    fields: {
      code: string;
      label: string;
    };
    isScrap: boolean;
    RegDate: string;
    view: number;
    content: string;
  }[];
}

export interface GetDetailRecruitsResponse {
  id: number;
  name: string;
  title: string;
  areas: {
    code: string;
    label: string;
  };
  fields: {
    code: string;
    label: string;
  };
  isScrap: boolean;
  RegDate: string;
  view: number;
  content: string;
}

export interface PostRecruitsRequest {
  title: string;
  content: string;
  fields: string[];
  areas: string[];
}

export interface PostRecruitsResponse {
  success: boolean;
}

export interface PutRecruitsRequest {
  id: number;
  data: { title: string; content: string };
}

export interface PutRecruitsResponse {
  success: boolean;
}

export interface DeleteRecruitsResponse {
  success: boolean;
}

export interface PostRecruitsScrapResponse {
  success: boolean;
}

export interface DeleteRecruitsScrapResponse {
  success: boolean;
}
