import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm, IData } from '../../hooks/useFormState';
import Form from '../../components/Form';
import * as S from '../../components/styles';
import FormControl from '../../components/FormControl';
import ReactQuillForm from '../../components/ReactQuillForm';
import ErrorMessage from '../../components/ErrorMessage';
import { removeHtmlTags } from '../../utils/utils';
import { useToast } from '../../hooks/useToastState';
import Upload from '../../components/Upload';

function testRegister() {
  return new Promise((resolve) => setTimeout(() => resolve('success'), 2000));
}

export default () => {
  const initialValue = {
    title: '',
    content: '',
    thumbUrl: '',
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!values.title) {
      errors.title = '제목을 입력하세요.';
    }

    if (!removeHtmlTags(values.content)) {
      errors.content = '내용을 입력하세요.';
    }

    if (!values.thumbUrl) {
      errors.thumbUrl = '썸네일을 업로드하세요.';
    }

    return errors;
  };

  const { mutate, isSuccess, isPending } = useMutation({ mutationFn: testRegister });

  const onSubmit = (values: IData<string>) => {
    console.log('onSubmit: ', values);
    mutate();
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
  }, [isSuccess]);

  return (
    <S.Container $paddingTop $paddingBottom>
      <Form id="test-form" onSubmit={handleSubmit}>
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
        <FormControl
          label="썸네일"
          htmlFor="thumbUrl"
          required
          error={<ErrorMessage touched={touched.thumbUrl} message={errors.thumbUrl} />}
        >
          <Upload id="thumbUrl" {...getUploadProps('thumbUrl')} thumbnailMode accept=".jpg, .jpeg, .png" />
        </FormControl>

        <div className="text-right mt-5">
          <S.Button type="submit" disabled={isPending}>
            확인
          </S.Button>
        </div>
      </Form>
    </S.Container>
  );
};
