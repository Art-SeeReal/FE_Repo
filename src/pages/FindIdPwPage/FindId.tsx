import React, { useState, useEffect } from 'react';
import { Form, Field, IData, ErrorMessage } from '../../hooks/useFormState';
import * as S from '../../components/styles';
import { useFindIdQuery } from '../../hooks/userQueries';
import FormControl from '../../components/FormControl';
import { isValidValue } from '../../utils/Validation';

const FindId = () => {
  const [formIdData, setFormIdData] = useState({
    name: '',
    email: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { refetch } = useFindIdQuery({ name: formIdData.name, email: formIdData.email });
  const handleSubmit = (values: IData<string>) => {
    setFormIdData({ name: values.userName, email: values.userEmail });
    setFormSubmitted(true);
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!isValidValue(values.userName)) {
      errors.userName = '이름을 입력하세요.';
    }

    if (!isValidValue(values.userEmail)) {
      errors.userEmail = '이메일을 입력하세요.';
    }

    return errors;
  };

  useEffect(() => {
    if (formSubmitted && formIdData) {
      refetch();
    }
  }, [formSubmitted, formIdData]);

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
