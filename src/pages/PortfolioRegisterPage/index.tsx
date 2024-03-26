import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import { titleErrorMessage, contentErrorMessage } from '../../utils/validation';
import Form from '../../components/Form';
import { useToast } from '../../hooks/customs/useToastState';
import * as S from '../../components/styles';
import FormControl from '../../components/FormControl';
import ReactQuillForm from '../../components/ReactQuillForm';
import ErrorMessage from '../../components/ErrorMessage';
import { useRegisterRecruits } from '../../hooks/query/useRecruitsQuery';

const CenteredContainer = styled.div`
  width: 800px;
  margin: auto;
  padding: 100px 0;
`;

const RegisterPortfolioPage = () => {
  const initialValue = {
    title: '',
    content: '',
  };
  const navigate = useNavigate();

  const { mutate: register, isSuccess } = useRegisterRecruits();

  const onSubmit: OnSubmitFn = ({ title, content }) => {
    register({ title, content });
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      title: titleErrorMessage(values.title),
      content: contentErrorMessage(values.content),
    };
    return errors;
  };

  const { errors, touched, getFieldProps, getQuillProps, handleSubmit, resetForm } = useForm({
    initialValue,
    validate,
    onSubmit,
  });

  const { appendToast } = useToast();

  useEffect(() => {
    if (!isSuccess) return;

    resetForm();
    appendToast({ content: '작성 완료', type: 'success' });
    navigate('/portfolios');
  }, [isSuccess]);

  return (
    <CenteredContainer>
      <S.Title>등록</S.Title>
      <Form id="register-form" onSubmit={handleSubmit}>
        <FormControl
          label="제목"
          htmlFor="title"
          required
          error={<ErrorMessage touched={touched.title} message={errors.title} />}
        >
          <S.Field id="title" {...getFieldProps('title')} placeholder="제목을 입력하세요." />
        </FormControl>
        <FormControl
          label="내용"
          htmlFor="content"
          required
          error={<ErrorMessage touched={touched.content} message={errors.content} />}
        >
          <ReactQuillForm {...getQuillProps('content')} />
        </FormControl>
        <S.Button type="submit">제출</S.Button>
      </Form>
    </CenteredContainer>
  );
};

export default RegisterPortfolioPage;
