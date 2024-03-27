import React, { useEffect, useState } from 'react';
import * as S from '../../components/styles';
import Form from '../../components/Form';
import FormControl from '../../components/FormControl';
import ErrorMessage from '../../components/ErrorMessage';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import { nameErrorMessage, emailErrorMessage } from '../../utils/validation';
import { useFetchUserId } from '../../hooks/query/useUserQuery';

const FindnameForm = () => {
  const initialValue = {
    name: '',
    email: '',
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      name: nameErrorMessage(values.name),
      email: emailErrorMessage(values.email),
    };

    return errors;
  };

  const [payload, setPayload] = useState({ ...initialValue });
  const { refetch, data, isFetching, isSuccess } = useFetchUserId({ name: payload.name, email: payload.email });

  const onSubmit: OnSubmitFn = () => {
    refetch();
  };

  const { values, errors, touched, handleSubmit, getFieldProps } = useForm({ initialValue, validate, onSubmit });

  useEffect(() => {
    const { name, email } = values;
    setPayload({ name, email });
  }, [values]);

  return (
    <>
      <S.Title>아이디 찾기</S.Title>
      {isSuccess ? (
        <>
          <S.Description $size="small">입력하신 정보와 일치하는 아이디는 아래와 같습니다.</S.Description>
          <S.Description className="bold my-5 text-center">{data?.userId}</S.Description>
          <S.ButtonRouter to="/login" $block>
            로그인 페이지로
          </S.ButtonRouter>
        </>
      ) : (
        <Form id="find-user-id-form" onSubmit={handleSubmit}>
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
          <S.Button type="submit" $block disabled={isFetching}>
            아이디 찾기
          </S.Button>
        </Form>
      )}
    </>
  );
};

export default FindnameForm;
