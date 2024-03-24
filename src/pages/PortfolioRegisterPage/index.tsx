import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, IData } from '../../hooks/useFormState';
import Form from '../../components/Form';
import { useToast } from '../../hooks/customs/useToastState';
import * as S from '../../components/styles';
import FormControl from '../../components/FormControl';
import ReactQuillForm from '../../components/ReactQuillForm';
import { isValidValue } from '../../utils/validation';
import ErrorMessage from '../../components/ErrorMessage';
import { removeHtmlTags } from '../../utils/utils';
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

  const onSubmit = (values: IData<string>) => {
    register({ title: values.title, content: values.content });
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!isValidValue(values.title)) {
      errors.title = '제목을 입력하세요.';
    }

    if (!removeHtmlTags(values.content)) {
      errors.content = '내용을 입력하세요.';
    }

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
    navigate('/portfolio');
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
