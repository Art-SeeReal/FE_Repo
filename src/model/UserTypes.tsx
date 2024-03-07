export interface RequestFindIdTypes {
  name: string;
  email: string;
}
export interface RequestFindPwTypes {
  name: string;
  id: string;
  email: string;
}
export interface loginData {
  id: string;
  pw: string;
}

export interface loginResponse {
  success: boolean;
}
