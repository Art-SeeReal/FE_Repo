import { AxiosResponse } from 'axios';
import api from '../utils/api';
import { SignupData } from '../model/UserTypes';

export const fetchRegisterUser = async ({
  signupData,
}: {
  signupData: SignupData;
}): Promise<AxiosResponse<SignupData>> => {
  const response = await api.post('/signup', signupData);
  return response;
};
