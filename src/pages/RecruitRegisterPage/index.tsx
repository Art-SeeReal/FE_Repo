import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import { titleErrorMessage, contentErrorMessage, fieldErrorMessage, areaErrorMessage } from '../../utils/validation';
import Form from '../../components/Form';
import { useToast } from '../../hooks/customs/useToastState';
import * as S from '../../components/styles';
import FormControl from '../../components/FormControl';
import ReactQuillForm from '../../components/ReactQuillForm';
import ErrorMessage from '../../components/ErrorMessage';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';
import { useFetchRegions, useFetchFields } from '../../hooks/query/useUtilQuery';
import { useRegisterRecruits } from '../../hooks/query/useRecruitsQuery';

const RegisterPortfolioPage = () => {
  const initialValue = {
    title: '',
    content: '',
    fields: '',
    regions: '',
  };
  const navigate = useNavigate();
  const { data: fieldsData } = useFetchFields();
  const { data: regionsData } = useFetchRegions();
  const [selectedField, setSelectedField] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const { mutate: register, isSuccess } = useRegisterRecruits();

  const onSubmit: OnSubmitFn = ({ title, content }) => {
    register({ title, content, fields: selectedField, regions: selectedRegions });
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      title: titleErrorMessage(values.title),
      content: contentErrorMessage(values.content),
      fields: fieldErrorMessage(selectedField),
      regions: areaErrorMessage(selectedRegions),
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
    navigate('/recruits');
  }, [isSuccess]);

  return (
    <S.Container $width={800}>
      <S.Title $center>공고 등록</S.Title>
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
          label="지역"
          htmlFor="regions"
          required
          error={<ErrorMessage touched={touched.regions} message={errors.regions} />}
        >
          <MultipleDropdownMenu
            values={selectedRegions}
            setValues={(values) => setSelectedRegions(values)}
            defaultLabel="지역"
            checkboxGroup={{
              initialValues: [],
              data: regionsData?.results.map(({ code: value, label }) => ({ value, label })) || [],
              name: 'regions',
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
          <S.Button type="submit">제출</S.Button>
        </S.Row>
      </Form>
    </S.Container>
  );
};

export default RegisterPortfolioPage;
