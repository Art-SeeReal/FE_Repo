export interface GetRecruitsRequest {
  page: number;
  fields?: string[];
  regions?: string[];
  sortType?: string;
  keyWords?: string;
}

export interface GetRecruitsResponse {
  results: {
    id: number;
    name: string;
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
    RegDate: string;
    view: number;
    content: string;
  }[];
}

export interface GetDetailRecruitsResponse {
  id: number;
  name: string;
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
