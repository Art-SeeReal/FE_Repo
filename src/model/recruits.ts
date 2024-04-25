export interface GetRecruitsRequest {
  page: number;
  fields?: string[];
  regions?: string[];
  sortType?: string;
  keyWords?: string;
}

export interface RecruitsTypes {
  id: number;
  nickname: string;
  title: string;
  regions: {
    code: string;
    label: string;
  };
  fields: {
    code: string;
    label: string;
  };
  isScrap: boolean;
  userId: string;
}

export interface GetRecruitsResponse {
  results: RecruitsTypes[];
  count: number;
}

export interface GetDetailRecruitsResponse {
  id: number;
  nickname: string;
  title: string;
  regions: {
    code: string;
    label: string;
  };
  fields: {
    code: string;
    label: string;
  };
  isScrap: boolean;
  userId: string;
  RegDate: string;
  view: number;
  content: string;
}

export interface PostRecruitsRequest {
  title: string;
  content: string;
  fields: string[];
  regions: string[];
}

export interface PutRecruitsRequest {
  id: number;
  data: { title: string; content: string };
}
