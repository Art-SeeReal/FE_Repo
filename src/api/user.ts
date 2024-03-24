import { AxiosResponse } from 'axios';
import api from '../utils/api';
import { SignupData } from '../model/apiTypes';
import { RequestFindIdTypes, RequestFindPwTypes, LoginResponse, LoginData } from '../model/apiTypes';

export const fetchRegisterUser = async ({
  signupData,
}: {
  signupData: SignupData;
}): Promise<AxiosResponse<SignupData>> => {
  return api({ url: `/user`, method: 'post', data: signupData });
};

export const fetchFindId = async ({ name, email }: RequestFindIdTypes): Promise<{ success: boolean }> => {
  return api({ url: `/findId`, method: 'get', params: { name, email } });
};

export const fetchFindPw = async ({ name, id, email }: RequestFindPwTypes): Promise<{ success: boolean }> => {
  return api({ url: `/findPw`, method: 'get', params: { name, id, email } });
};

export const fetchLogin = async ({ id, pw }: LoginData): Promise<LoginResponse> => {
  return api({ url: `/login`, method: 'get', params: { id, pw } });
};
