import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, IData } from '../../../hooks/useFormState';
import Form from '../../../components/Form';
import * as S from '../../../components/styles';
import ErrorMessage from '../../../components/ErrorMessage';
import { removeHtmlTags } from '../../../utils/utils';
import { useToast } from '../../../hooks/useToastState';
import FormControl from '../../../components/FormControl';
import { useDialog } from '../../../hooks/useDialogState';
import Dialog from '../../../components/Dialog';
import ReactQuillForm from '../../../components/ReactQuillForm';
import { isValidValue } from '../../../utils/Validation';
import { useDeletePortfolio, useUpdatePortfolio, useFetchDetailPortfolio } from '../../../hooks/usePortfoliosQuery';

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

  const onSubmit = (values: IData<string>) => {
    updatePortfolio({ id: userId, userData: values });
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
    openDialog(
      <Dialog header="알림" footer={<S.Button onClick={closeDialog}>확인</S.Button>}>
        이 페이지는 예술적 표현을 위한 공간입니다. 음란물이나 욕설 등 부적절한 콘텐츠는 엄격히 금지되어 있습니다.
        부적절한 콘텐츠를 게시할 경우 서비스 이용이 제한될 수 있습니다.
      </Dialog>,
    );
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    appendToast({ content: '작성 완료', type: 'success' });
    navigate(`/portfolio/${userId}`);
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
