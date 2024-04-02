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
import { useFetchAreas, useFetchField } from '../../hooks/query/useUtilQuery';
import { useRegisterRecruits } from '../../hooks/query/useRecruitsQuery';

const RegisterPortfolioPage = () => {
  const initialValue = {
    title: '',
    content: '',
    field: '',
    areas: '',
  };
  const navigate = useNavigate();
  const { data: fieldData } = useFetchField();
  const { data: areasData } = useFetchAreas();
  const [selectedField, setSelectedField] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const { mutate: register, isSuccess } = useRegisterRecruits();

  const onSubmit: OnSubmitFn = ({ title, content }) => {
    register({ title, content, fields: selectedField, areas: selectedAreas });
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      title: titleErrorMessage(values.title),
      content: contentErrorMessage(values.content),
      field: fieldErrorMessage(selectedField),
      areas: areaErrorMessage(selectedAreas),
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
      <S.Title $center>등록</S.Title>
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
          htmlFor="field"
          required
          error={<ErrorMessage touched={touched.field} message={errors.field} />}
        >
          <MultipleDropdownMenu
            values={selectedField}
            setValues={(values) => setSelectedField(values)}
            defaultLabel="분야"
            checkboxGroup={{
              initialValues: [],
              data: fieldData?.results.map(({ code: value, label }) => ({ value, label })) || [],
              name: 'field',
            }}
          />
        </FormControl>
        <FormControl
          label="지역"
          htmlFor="areas"
          required
          error={<ErrorMessage touched={touched.areas} message={errors.areas} />}
        >
          <MultipleDropdownMenu
            values={selectedAreas}
            setValues={(values) => setSelectedAreas(values)}
            defaultLabel="지역"
            checkboxGroup={{
              initialValues: [],
              data: areasData?.results.map(({ code: value, label }) => ({ value, label })) || [],
              name: 'areas',
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
