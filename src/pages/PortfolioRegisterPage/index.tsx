import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import { titleErrorMessage, contentErrorMessage, fieldErrorMessage } from '../../utils/validation';
import Form from '../../components/Form';
import { useToast } from '../../hooks/customs/useToastState';
import * as S from '../../components/styles';
import FormControl from '../../components/FormControl';
import ReactQuillForm from '../../components/ReactQuillForm';
import ErrorMessage from '../../components/ErrorMessage';
import { useRegisterPortfolio } from '../../hooks/query/usePortfoliosQuery';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';
import { useFetchFields } from '../../hooks/query/useUtilQuery';
import Upload from '../../components/Upload';

const RegisterPortfolioPage = () => {
  const initialValue = {
    title: '',
    content: '',
    fields: '',
    thumbUrl: '',
  };
  const navigate = useNavigate();
  const { data: fieldsData } = useFetchFields();
  const { mutate: register, isSuccess } = useRegisterPortfolio();
  const [selectedField, setSelectedField] = useState<string[]>([]);

  const onSubmit: OnSubmitFn = ({ title, content }) => {
    register({ title, content });
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      title: titleErrorMessage(values.title),
      content: contentErrorMessage(values.content),
      fields: fieldErrorMessage(selectedField),
    };
    return errors;
  };

  const { errors, touched, getFieldProps, getQuillProps, getUploadProps, handleSubmit, resetForm } = useForm({
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
    <S.Container $width={800}>
      <S.Title $center>포트폴리오 등록</S.Title>
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
          htmlFor="fields"
          required
          error={<ErrorMessage touched={touched.fields} message={errors.fields} />}
        >
          <MultipleDropdownMenu
            values={selectedField}
            setValues={(values) => setSelectedField(values)}
            defaultLabel="분야"
            checkboxGroup={{
              initialValues: [],
              data: fieldsData?.results.map(({ code: value, label }) => ({ value, label })) || [],
              name: 'fields',
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
          <S.Button type="submit">등록하기</S.Button>
        </S.Row>
      </Form>
    </S.Container>
  );
};

export default RegisterPortfolioPage;
