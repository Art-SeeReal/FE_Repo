import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useLoginQuery } from '../../hooks/userQueries';
import { Form, Field, IData, ErrorMessage } from '../../hooks/useFormState';
import * as S from '../../components/styles';
import FormControl from '../../components/FormControl';
import { userState } from '../../recoil/atoms/userState';

const LoginPageWrapper = styled.div`
  width: 800px;
  margin: auto;
  padding: 150px 0;
`;

const LoginPage = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const navigate = useNavigate();
  const { isSuccess, refetch, data } = useLoginQuery({ id, pw });
  const setUserState = useSetRecoilState(userState);

  const handleSubmit = async (values: IData<string>) => {
    await setId(values.userId);
    await setPw(values.userPw);
    refetch();
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!values.userId) {
      errors.userId = '아이디를 입력하세요.';
    }

    if (!values.userPw) {
      errors.userPw = '패스워드를 입력하세요.';
    }

    return errors;
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.success) {
        setUserState(true);
        navigate('/private');
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
  }, [isSuccess, data]);

  return (
    <LoginPageWrapper>
      <S.Title>로그인</S.Title>
      <Form id="login-form" initialValue={{ userId: '', userPw: '' }} validate={validate} onSubmit={handleSubmit}>
        <FormControl label="아이디" htmlFor="userId" required error={<ErrorMessage name="userId" />}>
          <Field id="userId" name="userId" type="text" placeholder="아이디" />
        </FormControl>
        <FormControl label="비밀번호" htmlFor="userPw" required error={<ErrorMessage name="userPw" />}>
          <Field id="userPw" name="userPw" type="password" placeholder="비밀번호" />
        </FormControl>
        <S.Button type="submit">제출</S.Button>
      </Form>
    </LoginPageWrapper>
  );
};

export default LoginPage;
