import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import Form from '../../components/Form';
import * as S from '../../components/styles';
import ErrorMessage from '../../components/ErrorMessage';
import { useToast } from '../../hooks/customs/useToastState';
import FormControl from '../../components/FormControl';
import ReactQuillForm from '../../components/ReactQuillForm';
import { contentErrorMessage, fieldErrorMessage, titleErrorMessage } from '../../utils/validation';
import { useUpdatePortfolio, useFetchDetailPortfolio } from '../../hooks/query/usePortfoliosQuery';
import { useFetchField } from '../../hooks/query/useUtilQuery';
import Upload from '../../components/Upload';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';

const ModifyPortfolioPage = () => {
  const params = useParams();
  const postId = Number(params.id);
  const { data: portfolioDetail } = useFetchDetailPortfolio(Number(postId));
  const { mutate: updatePortfolio, isSuccess } = useUpdatePortfolio();
  const { data: fieldData } = useFetchField();
  const fieldsValue = portfolioDetail?.fields?.code || [];
  const [selectedField, setSelectedField] = useState<string[]>(
    Array.isArray(fieldsValue) ? fieldsValue : [fieldsValue],
  );
  const [initialValue, setInitialValue] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const validate: ValidateFn = (values) => {
    const errors = {
      title: titleErrorMessage(values.title),
      content: contentErrorMessage(values.content),
      field: fieldErrorMessage(selectedField),
    };
    return errors;
  };

  const onSubmit: OnSubmitFn = ({ title, content }) => {
    updatePortfolio({ id: postId, data: { title, content, fields: selectedField } });
  };

  const { errors, touched, getFieldProps, getQuillProps, getUploadProps, handleSubmit } = useForm({
    initialValue,
    validate,
    onSubmit,
  });
  const { appendToast } = useToast();

  useEffect(() => {
    if (portfolioDetail) {
      setInitialValue({ title: portfolioDetail.title, content: portfolioDetail.content });
    }
  }, [portfolioDetail]);

  useEffect(() => {
    if (!isSuccess) return;
    appendToast({ content: '작성 완료', type: 'success' });
    navigate(`/portfolios/${postId}`);
  }, [isSuccess]);

  return (
    <S.Container $width={800}>
      <S.Title $center>수정</S.Title>
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
          label="썸네일"
          htmlFor="thumbUrl"
          required
          error={<ErrorMessage touched={touched.thumbUrl} message={errors.thumbUrl} />}
        >
          <Upload id="thumbUrl" {...getUploadProps('thubUrl')} thumbnailMode accept=".jpg, .jpeg, .png" />
        </FormControl>
        <FormControl
          label="분야"
          htmlFor="field"
          required
          error={<ErrorMessage touched={touched.field} message={errors.field} />}
        >
          <MultipleDropdownMenu
            values={selectedField}
            setValues={(values) => setSelectedField(values)}
            defaultLabel="분야"
            checkboxGroup={{
              initialValues: selectedField,
              data: fieldData?.results.map(({ code: value, label }) => ({ value, label })) || [],
              name: 'field',
            }}
          />
        </FormControl>
        <FormControl
          label="내용"
          htmlFor="content"
          required
          error={<ErrorMessage touched={touched.content} message={errors.content} />}
        >
          <ReactQuillForm {...getQuillProps('content')} />
        </FormControl>
        <S.Row $justifyContent="flex-end">
          <S.Button type="submit">수정하기</S.Button>
        </S.Row>
      </Form>
    </S.Container>
  );
};

export default ModifyPortfolioPage;
