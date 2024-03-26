import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import Form from '../../components/Form';
import * as S from '../../components/styles';
import ErrorMessage from '../../components/ErrorMessage';
import { useToast } from '../../hooks/customs/useToastState';
import FormControl from '../../components/FormControl';
import { useDialog } from '../../hooks/customs/useDialogState';
import Dialog from '../../components/Dialog';
import ReactQuillForm from '../../components/ReactQuillForm';
import { contentErrorMessage, titleErrorMessage } from '../../utils/validation';
import { useDeletePortfolio, useUpdatePortfolio, useFetchDetailPortfolio } from '../../hooks/query/usePortfoliosQuery';

const CenteredContainer = styled.div`
  width: 800px;
  margin: auto;
  padding: 100px 0;
`;

const ModifyPortfolioPage = () => {
  const params = useParams();
  const userId = Number(params.id);
  const { data: portfolioDetail } = useFetchDetailPortfolio(Number(userId));
  const { mutate: updatePortfolio, isSuccess } = useUpdatePortfolio();
  const { mutate: deletePortfolio } = useDeletePortfolio();
  const navigate = useNavigate();
  const initialValue = {
    title: portfolioDetail?.title || '',
    content: portfolioDetail?.content || '',
  };
  const validate: ValidateFn = (values) => {
    const errors = {
      title: titleErrorMessage(values.title),
      content: contentErrorMessage(values.content),
    };
    return errors;
  };

  const onSubmit: OnSubmitFn = ({ title, content }) => {
    updatePortfolio({ id: userId, data: { title, content } });
  };

  const { errors, touched, getFieldProps, getQuillProps, handleSubmit } = useForm({
    initialValue,
    validate,
    onSubmit,
  });
  const { appendToast } = useToast();

  const { openDialog, closeDialog } = useDialog();

  const deleteContent = () => {
    openDialog(
      <Dialog header="알림" footer={<S.Button onClick={closeDialog}>확인</S.Button>}>
        삭제하시겠습니까?
      </Dialog>,
    );
    deletePortfolio({ id: userId });
  };

  useEffect(() => {
    if (!isSuccess) return;
    appendToast({ content: '작성 완료', type: 'success' });
    navigate(`/portfolios/${userId}`);
  }, [isSuccess]);

  return (
    <CenteredContainer>
      <S.Title>수정</S.Title>
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
        <S.Button type="submit">수정하기</S.Button>
        <S.Button onClick={deleteContent}>삭제</S.Button>
      </Form>
    </CenteredContainer>
  );
};

export default ModifyPortfolioPage;
