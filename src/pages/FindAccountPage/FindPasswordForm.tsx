import React, { useState, useEffect } from 'react';
import * as S from '../../components/styles';
import Form from '../../components/Form';
import FormControl from '../../components/FormControl';
import ErrorMessage from '../../components/ErrorMessage';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import { nameErrorMessage, emailErrorMessage, userIdErrorMessage } from '../../utils/validation';
import { useFetchUserExist } from '../../hooks/query/useUserQuery';
import CertEmailForm from './CertEmailForm';

const FindPasswordForm = () => {
  const initialValue = {
    name: '',
    email: '',
    userId: '',
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      name: nameErrorMessage(values.name),
      email: emailErrorMessage(values.email),
      userId: userIdErrorMessage(values.userId),
    };

    return errors;
  };

  const [payload, setPayload] = useState({ ...initialValue });
  const { refetch, data, isFetching, isSuccess } = useFetchUserExist({
    name: payload.name,
    email: payload.email,
    userId: payload.userId,
  });

  const onSubmit: OnSubmitFn = () => {
    refetch();
  };

  const { values, errors, touched, handleSubmit, getFieldProps } = useForm({ initialValue, validate, onSubmit });

  useEffect(() => {
    const { name, email, userId } = values;
    setPayload({ name, email, userId });
  }, [values]);

  return (
    <>
      <S.Title>비밀번호 찾기</S.Title>
      {isSuccess ? (
        <CertEmailForm sentEmail={data?.email} />
      ) : (
        <Form id="find-password-form" onSubmit={handleSubmit}>
          <FormControl
            label="이름"
            htmlFor="name"
            required
            error={<ErrorMessage touched={touched.name} message={errors.name} />}
          >
            <S.Field id="name" {...getFieldProps('name')} type="text" placeholder="이름" />
          </FormControl>
          <FormControl
            label="이메일"
            htmlFor="email"
            required
            error={<ErrorMessage touched={touched.email} message={errors.email} />}
          >
            <S.Field id="email" {...getFieldProps('email')} type="text" placeholder="이메일" />
          </FormControl>
          <FormControl
            label="로그인 아이디"
            htmlFor="userId"
            required
            error={<ErrorMessage touched={touched.userId} message={errors.userId} />}
          >
            <S.Field id="userId" {...getFieldProps('userId')} type="text" placeholder="로그인 아이디" />
          </FormControl>
          <S.Button type="submit" $block disabled={isFetching}>
            비밀번호 찾기
          </S.Button>
        </Form>
      )}
    </>
  );
};

export default FindPasswordForm;
