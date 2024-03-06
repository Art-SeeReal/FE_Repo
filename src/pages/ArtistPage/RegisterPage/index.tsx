import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Field, IData, ErrorMessage } from '../../../hooks/useFormState';
import * as S from '../../../components/styles';
import FormControl from '../../../components/FormControl';
import { useDialog } from '../../../hooks/useDialogState';
import Dialog from '../../../components/Dialog';
import ReactQuillForm from '../../../components/ReactQuillForm';
import { fetchRegisterArtist } from '../../../api/artist';
import { isValidValue } from '../../../utils/Validation';

const CenteredContainer = styled.div`
  width: 800px;
  margin: auto;
  padding: 100px 0;
`;

const RegisterArtistPage = () => {
  const [content, setContent] = useState('');
  const [form, setForm] = useState({ title: '', content: '' });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register } = useMutation(fetchRegisterArtist, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      navigate('/artist');
    },
  });

  const handleSubmit = (values: IData<string>) => {
    if (!isValidValue(content)) return;
    setForm({ title: values.title, content });
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!isValidValue(values.title)) {
      errors.title = '제목을 입력하세요.';
    }

    if (!isValidValue(values.thumbnail)) {
      errors.thumbnail = '썸네일 사진을 추가해주세요.';
    }

    return errors;
  };

  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    if (form.title && form.content) {
      register(form);
    }
  }, [form]);

  useEffect(() => {
    openDialog(
      <Dialog header="알림" footer={<S.Button onClick={closeDialog}>확인</S.Button>}>
        이 페이지는 예술적 표현을 위한 공간입니다. 음란물이나 욕설 등 부적절한 콘텐츠는 엄격히 금지되어 있습니다.
        부적절한 콘텐츠를 게시할 경우 서비스 이용이 제한될 수 있습니다.
      </Dialog>,
    );
  }, []);

  return (
    <CenteredContainer>
      <S.Title>등록</S.Title>
      <Form id="register-form" initialValue={{ title: '', thumbnail: '' }} validate={validate} onSubmit={handleSubmit}>
        <FormControl label="제목" htmlFor="title" required error={<ErrorMessage name="title" />}>
          <Field id="title" name="title" type="text" placeholder="제목" />
        </FormControl>
        <FormControl label="썸네일" htmlFor="thumbnail" required error={<ErrorMessage name="thumbnail" />}>
          <Field id="thumbnail" name="thumbnail" type="password" placeholder="썸네일" />
        </FormControl>
        <ReactQuillForm width="800px" height="400px" content={content} setContent={setContent} />
        <S.Button type="submit">제출</S.Button>
      </Form>
    </CenteredContainer>
  );
};

export default RegisterArtistPage;
