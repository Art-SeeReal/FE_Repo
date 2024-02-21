import React, { useEffect } from 'react';
import { Form, Field, IData, ErrorMessage } from '../../hooks/useFormState';
import * as S from '../../components/styles';
import FormControl from '../../components/FormControl';
import { useDialog } from '../../hooks/useDialogState';
import Dialog from '../../components/Dialog';

const SecondPage = () => {
  const handleSubmit = (values: IData<string>) => {
    console.log('## Submit Query', values);
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!values.userId) {
      errors.userId = '아이디를 입력하세요.';
    }

    if (!values.userPw) {
      errors.userPw = '패스워드를 입력하세요.';
    }

    return errors;
  };

  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    openDialog(
      <Dialog header="알림" footer={<S.Button onClick={closeDialog}>확인</S.Button>}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus illum sapiente ab distinctio laudantium
        adipisci pariatur? Incidunt molestiae magnam officiis dolores ex doloribus, ut, minima dolor error maiores
        repellat reprehenderit.
      </Dialog>,
    );
  }, []);

  return (
    <>
      <S.Title>로그인</S.Title>
      <Form id="login-form" initialValue={{ userId: '', userPw: '' }} validate={validate} onSubmit={handleSubmit}>
        <FormControl label="아이디" htmlFor="userId" required error={<ErrorMessage name="userId" />}>
          <Field id="userId" name="userId" type="text" placeholder="아이디" />
        </FormControl>
        <FormControl label="비밀번호" htmlFor="userPw" required error={<ErrorMessage name="userPw" />}>
          <Field id="userPw" name="userPw" type="password" placeholder="비밀번호" />
        </FormControl>
        <S.Button type="submit">제출</S.Button>
      </Form>
    </>
  );
};

export default SecondPage;
