import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, IData } from '../../../hooks/useFormState';
import Form from '../../../components/Form';
import { useToast } from '../../../hooks/useToastState';
import * as S from '../../../components/styles';
import FormControl from '../../../components/FormControl';
import { useDialog } from '../../../hooks/useDialogState';
import Dialog from '../../../components/Dialog';
import ReactQuillForm from '../../../components/ReactQuillForm';
import { isValidValue } from '../../../utils/Validation';
import ErrorMessage from '../../../components/ErrorMessage';
import { removeHtmlTags } from '../../../utils/utils';
import { useRegisterPortfolio } from '../../../hooks/usePortfoliosQuery';

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

  const { mutate: register, isSuccess } = useRegisterPortfolio();

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

  const { openDialog, closeDialog } = useDialog();
  const { appendToast } = useToast();

  useEffect(() => {
    openDialog(
      <Dialog header="알림" footer={<S.Button onClick={closeDialog}>확인</S.Button>}>
        이 페이지는 예술적 표현을 위한 공간입니다. 음란물이나 욕설 등 부적절한 콘텐츠는 엄격히 금지되어 있습니다.
        부적절한 콘텐츠를 게시할 경우 서비스 이용이 제한될 수 있습니다.
      </Dialog>,
    );
  }, []);

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