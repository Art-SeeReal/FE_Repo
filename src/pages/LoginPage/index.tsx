import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import Form from '../../components/Form';
import ErrorMessage from '../../components/ErrorMessage';
import FormControl from '../../components/FormControl';
import * as S from '../../components/styles';
import { userIdErrorMessage, passwordErrorMessage } from '../../utils/validation';
import { useLogin } from '../../hooks/query/useUserQuery';
import { isLoginSelector } from '../../recoil/selectors/userSelectors';

const LoginPage = () => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginSelector);
  if (isLogin) {
    navigate('/');
  }

  const initialValue = {
    userId: '',
    password: '',
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      userId: userIdErrorMessage(values.userId),
      password: passwordErrorMessage(values.password),
    };

    return errors;
  };

  const { mutate, isPending, isSuccess } = useLogin();

  const onSubmit: OnSubmitFn = ({ userId, password }) => {
    mutate({ userId, password });
  };

  const { errors, touched, getFieldProps, handleSubmit } = useForm({
    initialValue,
    validate,
    onSubmit,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  return (
    <S.Container $width={400}>
      <S.Title>로그인</S.Title>
      <Form id="login-form" onSubmit={handleSubmit}>
        <FormControl
          label="아이디"
          htmlFor="userId"
          required
          error={<ErrorMessage touched={touched.userId} message={errors.userId} />}
        >
          <S.Field id="userId" {...getFieldProps('userId')} type="text" placeholder="아이디" />
        </FormControl>
        <FormControl
          label="비밀번호"
          htmlFor="password"
          required
          error={<ErrorMessage touched={touched.password} message={errors.password} />}
        >
          <S.Field id="password" {...getFieldProps('password')} type="password" placeholder="비밀번호" />
        </FormControl>
        <S.Button type="submit" $block disabled={isPending}>
          로그인
        </S.Button>
        <S.Row $justifyContent="space-around" className="mt-5">
          <S.ButtonRouter to="/find-id-pw" $style="link" $size="xsmall">
            아이디/비밀번호 찾기
          </S.ButtonRouter>
          <S.ButtonRouter to="/signup" $style="link" $size="xsmall">
            회원가입
          </S.ButtonRouter>
        </S.Row>
      </Form>
    </S.Container>
  );
};

export default LoginPage;
