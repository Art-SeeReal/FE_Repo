import { atom } from 'recoil';
import { getToken } from '../../utils/auth';

const STATE_KEY = {
  user: 'user',
} as const;

interface UserState {
  token: string; // 로그인 후 서버에 응답 받은 유저 token값
  isAgreeForSignup: boolean; // 회원 가입 폼 진입 전 동의 폼의 체크 여부
}

export const userState = atom<UserState>({
  key: STATE_KEY.user,
  default: {
    token: getToken(),
    isAgreeForSignup: false,
  },
});
