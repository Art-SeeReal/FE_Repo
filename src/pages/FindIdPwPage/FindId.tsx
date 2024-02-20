import React, { useState } from 'react';
import { Form, Field, IData, ErrorMessage } from '../../hooks/useFormState';
import * as S from '../../components/styles';
import { useFindIdQuery } from '../../hooks/userQueries';
import FormControl from '../../components/FormControl';

const FindId = () => {
  const [formIdData, setFormIdData] = useState({
    name: '',
    email: '',
  });
  const { refetch } = useFindIdQuery({ name: formIdData.name, email: formIdData.email });
  const handleSubmit = async (values: IData<string>) => {
    await setFormIdData({ name: values.userName, email: values.userEmail });
    await refetch();
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!values.userName) {
      errors.userName = '이름을 입력하세요.';
    }

    if (!values.userEmail) {
      errors.userEmail = '이메일을 입력하세요.';
    }

    return errors;
  };

  return (
    <>
      <S.Title>아이디 찾기</S.Title>
      <Form id="login-form" initialValue={{ userName: '', userEmail: '' }} validate={validate} onSubmit={handleSubmit}>
        <FormControl label="이름" htmlFor="userName" required error={<ErrorMessage name="userName" />}>
          <Field id="userName" name="userName" type="text" placeholder="이름" />
        </FormControl>
        <FormControl label="이메일" htmlFor="userEmail" required error={<ErrorMessage name="userEmail" />}>
          <Field id="userEmail" name="userEmail" type="text" placeholder="이메일" />
        </FormControl>
        <S.Button type="submit">찾기</S.Button>
      </Form>
    </>
  );
};

export default FindId;
