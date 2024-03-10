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

export interface SignupData {
  name: string;
  nickName: string;
  email: string;
  pw: string;
  pwCheck: string;
  phoneNum: string;
  location: string;
}