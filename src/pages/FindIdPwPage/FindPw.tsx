import React, { useState } from 'react';
import { Form, Field, IData, ErrorMessage } from '../../hooks/useFormState';
import * as S from '../../components/styles';
import { useFindPwQuery } from '../../hooks/userQueries';
import FormControl from '../../components/FormControl';
import { isValidValue } from '../../utils/Validation';

const FindPw = () => {
  const [formPwData, setFormPwData] = useState({
    name: '',
    id: '',
    email: '',
  });
  const { refetch } = useFindPwQuery({
    name: formPwData.name,
    id: formPwData.id,
    email: formPwData.email,
  });
  const handleSubmit = async (values: IData<string>) => {
    await setFormPwData({ name: values.userName, id: values.userId, email: values.userEmail });
    await refetch();
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!isValidValue(values.userName)) {
      errors.userName = '이름을 입력하세요.';
    }

    if (!isValidValue(values.userId)) {
      errors.userId = '아이디를 입력하세요.';
    }

    if (!isValidValue(values.userEmail)) {
      errors.userEmail = '이메일을 입력하세요.';
    }

    return errors;
  };

  return (
    <>
      <S.Title>비밀번호 찾기</S.Title>
      <Form
        id="login-form"
        initialValue={{ userName: '', userId: '', userEmail: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <FormControl label="이름" htmlFor="userName" required error={<ErrorMessage name="userName" />}>
          <Field id="userName" name="userName" type="text" placeholder="이름" />
        </FormControl>
        <FormControl label="아이디" htmlFor="userId" required error={<ErrorMessage name="userId" />}>
          <Field id="userId" name="userId" type="text" placeholder="아이디" />
        </FormControl>
        <FormControl label="이메일" htmlFor="userEmail" required error={<ErrorMessage name="userEmail" />}>
          <Field id="userEmail" name="userEmail" type="text" placeholder="이메일" />
        </FormControl>
        <S.Button type="submit">찾기</S.Button>
      </Form>
    </>
  );
};

export default FindPw;
