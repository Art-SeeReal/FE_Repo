import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';

export const useSetAgreeForSignup = () => {
  const setUserState = useSetRecoilState(userState);

  return () => {
    setUserState((prev) => ({ ...prev, isAgreeForSignup: true }));
  };
};

export const useSetUserToken = () => {
  const setUserState = useSetRecoilState(userState);

  return (token: string) => {
    // response token값 셋팅
    setUserState((prev) => ({ ...prev, token }));
  };
};
