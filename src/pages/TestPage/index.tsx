import React from 'react';
import * as S from '../../components/styles';
import Upload from '../../components/Upload';
import FormControl from '../../components/FormControl';
import { Form, Field, ErrorMessage, IData } from '../../hooks/useFormState';

const TestPage = () => {
  const handleSubmit = (values: IData<string>) => {
    console.log('handleSubmit: ', values);
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!values.title) {
      errors.title = '제목을 입력하세요.';
    }

    if (!values.thumbUrl) {
      errors.thumbUrl = '파일을 서버에 업로드하세요.';
    }

    return errors;
  };

  return (
    <S.Container $paddingBottom>
      <S.Title>파일 업로드</S.Title>
      <Form id="file-form" initialValue={{ title: '', thumbUrl: '' }} validate={validate} onSubmit={handleSubmit}>
        <FormControl label="제목" htmlFor="title" required error={<ErrorMessage name="title" />}>
          <Field id="title" name="title" placeholder="제목" />
        </FormControl>

        <FormControl label="썸네일" htmlFor="thumbUrl" required error={<ErrorMessage name="thumbUrl" />}>
          <Upload id="thumbUrl" name="thumbUrl" accept=".jpg, .jpeg" useThumbnail />
        </FormControl>

        <div style={{ marginTop: 60 }}>
          <S.Button type="submit">제출</S.Button>
        </div>
      </Form>
    </S.Container>
  );
};

export default TestPage;
