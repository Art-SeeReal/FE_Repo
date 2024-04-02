import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import { titleErrorMessage, contentErrorMessage } from '../../utils/validation';
import Form from '../../components/Form';
import * as S from '../../components/styles';
import ErrorMessage from '../../components/ErrorMessage';
import { useToast } from '../../hooks/customs/useToastState';
import FormControl from '../../components/FormControl';
import ReactQuillForm from '../../components/ReactQuillForm';
import { useUpdateRecruits, useFetchDetailRecruits } from '../../hooks/query/useRecruitsQuery';
import { useFetchAreas, useFetchField } from '../../hooks/query/useUtilQuery';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';

const ModifyRecruitsPage = () => {
  const params = useParams();
  const postId = Number(params.id);
  const { data: recruitsDetail } = useFetchDetailRecruits(Number(postId));
  const { mutate: updateRecruits, isSuccess } = useUpdateRecruits();

  const { data: fieldData } = useFetchField();
  const { data: areasData } = useFetchAreas();
  const fieldsValue = recruitsDetail?.fields?.code || [];
  const [selectedField, setSelectedField] = useState<string[]>(
    Array.isArray(fieldsValue) ? fieldsValue : [fieldsValue],
  );
  const areasValue = recruitsDetail?.areas?.code || [];
  const [selectedAreas, setSelectedAreas] = useState<string[]>(Array.isArray(areasValue) ? areasValue : [areasValue]);
  const [initialValue, setInitialValue] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const validate: ValidateFn = (values) => {
    const errors = {
      title: titleErrorMessage(values.title),
      content: contentErrorMessage(values.content),
    };
    return errors;
  };

  const onSubmit: OnSubmitFn = ({ title, content }) => {
    updateRecruits({ id: postId, data: { title, content } });
  };

  const { errors, touched, getFieldProps, getQuillProps, handleSubmit } = useForm({
    initialValue,
    validate,
    onSubmit,
  });
  const { appendToast } = useToast();

  useEffect(() => {
    if (recruitsDetail) {
      setInitialValue({ title: recruitsDetail.title, content: recruitsDetail.content });
    }
  }, [recruitsDetail]);

  useEffect(() => {
    if (recruitsDetail) {
      setInitialValue({ title: recruitsDetail.title, content: recruitsDetail.content });
    }
  }, [recruitsDetail]);

  useEffect(() => {
    if (!isSuccess) return;
    appendToast({ content: '작성 완료', type: 'success' });
    navigate(`/Recruits/${postId}`);
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
              initialValues: selectedAreas,
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
          <S.Button type="submit">수정하기</S.Button>
        </S.Row>
      </Form>
    </S.Container>
  );
};

export default ModifyRecruitsPage;
