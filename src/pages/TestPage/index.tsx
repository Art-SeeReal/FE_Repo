import React from 'react';
import { Form, Field, IData, ErrorMessage } from '../../hooks/useFormQuery';
import * as S from '../../components/styles';
import FormControl from '../../components/FormControl';

const SecondPage = () => {
  const handleSubmit = (values: IData<string>) => {
    console.log('## secondPage', values);
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

  return (
    <>
      <S.Title>로그인</S.Title>
      <Form id="login-form" initialValue={{ userId: '123', userPw: '123' }} validate={validate} onSubmit={handleSubmit}>
        <FormControl label="아이디" htmlFor="userId" required error={<ErrorMessage name="userId" />}>
          <Field id="userId" name="userId" type="text" placeholder="아이디" />
        </FormControl>
        <FormControl label="비밀번호" htmlFor="userPw" required error={<ErrorMessage name="userPw" />}>
          <Field id="userPw" name="userPw" type="password" placeholder="비밀번호" />
        </FormControl>
        <S.Button type="submit">제출</S.Button>
      </Form>
    </>
  );
};

export default SecondPage;
