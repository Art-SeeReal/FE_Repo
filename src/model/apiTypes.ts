// 포트폴리오 타입

export interface GetPortfoliosRequest {
  page: number;
}

export interface GetPortfoliosResponse {
  results: {
    id: number;
    imageUrl: string;
    title: string;
    artist: string;
    location: {
      code: string;
      label: string;
    };
    field: {
      code: string;
      label: string;
    };
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
  location: {
    code: string;
    label: string;
  };
  field: {
    code: string;
    label: string;
  };
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
  data: { title: string; content: string };
}

export interface PutPortfolioResponse {
  success: boolean;
}

export interface DeletePortfolioResponse {
  success: boolean;
}

//Recruits타입

export interface GetRecruitsRequest {
  page: number;
}

export interface GetRecruitsResponse {
  results: {
    id: number;
    name: string;
    title: string;
    location: {
      code: string;
      label: string;
    };
    field: {
      code: string;
      label: string;
    };
    RegDate: string;
    content: string;
  }[];
}

export interface GetDetailRecruitsResponse {
  id: number;
  name: string;
  title: string;
  location: {
    code: string;
    label: string;
  };
  field: {
    code: string;
    label: string;
  };
  RegDate: string;
  content: string;
}

export interface PostRecruitsRequest {
  title: string;
  content: string;
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

// 유저타입

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
