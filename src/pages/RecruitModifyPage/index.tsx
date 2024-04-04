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
import { useFetchRegions, useFetchFields } from '../../hooks/query/useUtilQuery';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';

const ModifyRecruitsPage = () => {
  const params = useParams();
  const postId = Number(params.id);
  const navigate = useNavigate();
  const { data: recruitsDetail } = useFetchDetailRecruits(Number(postId));
  const { mutate: updateRecruits, isSuccess } = useUpdateRecruits();
  const { data: fieldsData } = useFetchFields();
  const { data: regionsData } = useFetchRegions();
  const fieldsValue = recruitsDetail?.fields?.code || [];
  const regionsValue = recruitsDetail?.regions?.code || [];
  const [selectedField, setSelectedField] = useState<string[]>(
    Array.isArray(fieldsValue) ? fieldsValue : [fieldsValue],
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    Array.isArray(regionsValue) ? regionsValue : [regionsValue],
  );
  const [initialValue, setInitialValue] = useState({ title: '', content: '' });

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
          htmlFor="fields"
          required
          error={<ErrorMessage touched={touched.fields} message={errors.fields} />}
        >
          <MultipleDropdownMenu
            values={selectedField}
            setValues={(values) => setSelectedField(values)}
            defaultLabel="분야"
            checkboxGroup={{
              initialValues: selectedField,
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
              initialValues: selectedRegions,
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
          <S.Button type="submit">수정하기</S.Button>
        </S.Row>
      </Form>
    </S.Container>
  );
};

export default ModifyRecruitsPage;
