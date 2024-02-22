import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useLoginQuery } from '../../hooks/userQueries';
import { Form, Field, IData, ErrorMessage } from '../../hooks/useFormState';
import * as S from '../../components/styles';
import FormControl from '../../components/FormControl';
import { userState } from '../../recoil/atoms/userState';
import { useDialog } from '../../hooks/useDialogState';
import Dialog from '../../components/Dialog';
import { isValidValue } from '../../utils/Validation';

const LoginPageWrapper = styled.div`
  width: 400px;
  margin: auto;
  padding: 150px 0;
`;

const StyledLinksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [formLoginData, setFormLoginData] = useState({ id: '', pw: '' });
  const navigate = useNavigate();
  const { isSuccess, refetch, data } = useLoginQuery({ id: formLoginData.id, pw: formLoginData.pw });
  const setUserState = useSetRecoilState(userState);
  const { openDialog, closeDialog } = useDialog();

  // issue 비동기 버그
  const handleSubmit = async (values: IData<string>) => {
    await setFormLoginData({ id: values.userId, pw: values.userPw });
    refetch();
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!isValidValue(values.userId)) {
      errors.userId = '아이디를 입력하세요.';
    }

    if (!isValidValue(values.userPw)) {
      errors.userPw = '패스워드를 입력하세요.';
    }

    return errors;
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.success) {
        setUserState(true);
        navigate('/private');
      } else {
        openDialog(
          <Dialog header="알림" footer={<S.Button onClick={closeDialog}>확인</S.Button>}>
            올바른 아이디와 비밀번호가 아닙니다.
          </Dialog>,
        );
      }
    }
  }, [isSuccess, data]);

  return (
    <LoginPageWrapper>
      <S.Title>로그인</S.Title>
      <Form id="login-form" initialValue={{ userId: '', userPw: '' }} validate={validate} onSubmit={handleSubmit}>
        <FormControl label="아이디" htmlFor="userId" required error={<ErrorMessage name="userId" />}>
          <Field id="userId" name="userId" type="text" placeholder="아이디" />
        </FormControl>
        <FormControl label="비밀번호" htmlFor="userPw" required error={<ErrorMessage name="userPw" />}>
          <Field id="userPw" name="userPw" type="password" placeholder="비밀번호" />
        </FormControl>
        <S.Button type="submit">제출</S.Button>
        <StyledLinksWrapper>
          <StyledLink to="/find-id-pw">ID/PW 찾기</StyledLink>
          <StyledLink to="/signup">회원가입</StyledLink>
        </StyledLinksWrapper>
      </Form>
    </LoginPageWrapper>
  );
};

export default LoginPage;
