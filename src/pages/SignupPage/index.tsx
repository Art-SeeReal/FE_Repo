import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../../components/styles';
import { Form, Field, IData, ErrorMessage } from '../../hooks/useFormState';
import FormControl from '../../components/FormControl';
import {
  isValidName,
  isValidNickname,
  arePasswordsEqual,
  isValidEmail,
  isValidPassWord,
  isValidPhoneNum,
  isValidLocation,
} from '../../utils/Validation';
import { fetchRegisterUser } from '../../api/signup';

interface DividerProps {
  height?: string;
}

const LoginPageWrapper = styled.div`
  width: 800px;
  margin: auto;
  padding: 100px 0;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const Divider = styled.div<DividerProps>`
  width: 100%;
  height: ${(props) => props.height || '1px'};
  background-color: #000;
  margin: 10px 0;
`;

const SignupPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register } = useMutation(fetchRegisterUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      navigate('/');
    },
  });

  const handleSubmit = (values: IData<string>) => {
    register(values);
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!values.userName) {
      errors.userName = '이름을 입력하세요.';
    } else if (!isValidName(values.userName)) {
      errors.userName = '한글만 입력해주세요.';
    }

    if (!values.userNickName) {
      errors.userNickName = '닉네임을 입력하세요.';
    } else if (!isValidNickname(values.userNickName)) {
      errors.userName = '닉네임은 한글, 영문, 숫자만 가능하며 2-12자리 가능합니다.';
    }

    if (!values.userEmail) {
      errors.userEmail = '이메일을 입력하세요.';
    } else if (!isValidEmail(values.userEmail)) {
      errors.userEmail = '유효한 이메일 형식이 아닙니다. ex) artseereal@naver.com';
    }

    if (!values.userPw) {
      errors.userPw = '패스워드를 입력하세요.';
    } else if (!isValidPassWord(values.userPw)) {
      errors.userPw = '영문, 숫자, 특수문자로 구성한 8자 이상의 비밀번호를 입력하세요.';
    }

    if (!values.userPwCheck) {
      errors.userPwCheck = '패스워드를 입력하세요.';
    } else if (!arePasswordsEqual(values.userPw, values.userPwCheck)) {
      errors.userPwCheck = '비밀번호가 일치하지 않습니다.';
    }

    if (!values.userPhoneNum) {
      errors.userPhoneNum = '핸드폰번호를 입력하세요.';
    } else if (!isValidPhoneNum(values.userPhoneNum)) {
      errors.userPhoneNum = '유효한 핸드폰 번호 형식이 아닙니다. ex) 01012341234';
    }

    if (!values.userLocation) {
      errors.userLocation = '지역을 입력하세요.';
    } else if (!isValidLocation(values.userLocation)) {
      errors.userLocation = '한글만 입력해주세요.';
    }

    return errors;
  };

  return (
    <LoginPageWrapper>
      <S.Title>회원가입</S.Title>
      <Subtitle>아트씨리얼에 오신 것을 환영합니다.</Subtitle>
      <Divider height="3px" />
      <Form
        id="signup-form"
        initialValue={{
          userName: '',
          userNickName: '',
          userPw: '',
          userPwCheck: '',
          userEmail: '',
          userPhoneNum: '',
          userLocation: '',
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <FormControl label="이름" htmlFor="userName" required error={<ErrorMessage name="userName" />}>
          <Field id="userName" name="userName" type="text" placeholder="이름" />
        </FormControl>
        <FormControl label="닉네임" htmlFor="userNickName" required error={<ErrorMessage name="userNickName" />}>
          <Field id="userNickName" name="userNickName" type="text" placeholder="닉네임" />
        </FormControl>
        <FormControl label="이메일" htmlFor="userEmail" required error={<ErrorMessage name="userEmail" />}>
          <Field id="userEmail" name="userEmail" type="email" placeholder="이메일" />
        </FormControl>
        <FormControl label="비밀번호" htmlFor="userPw" required error={<ErrorMessage name="userPw" />}>
          <Field id="userPw" name="userPw" type="password" placeholder="비밀번호" />
        </FormControl>
        <FormControl label="비밀번호확인" htmlFor="userPwCheck" required error={<ErrorMessage name="userPwCheck" />}>
          <Field id="userPwCheck" name="userPwCheck" type="password" placeholder="비밀번호확인" />
        </FormControl>
        <FormControl label="핸드폰번호" htmlFor="userPhoneNum" required error={<ErrorMessage name="userPhoneNum" />}>
          <Field id="userPhoneNum" name="userPhoneNum" type="text" placeholder="핸드폰번호" />
        </FormControl>
        <FormControl label="지역" htmlFor="userLocation" required error={<ErrorMessage name="userLocation" />}>
          <Field id="userLocation" name="userLocation" type="text" placeholder="지역" />
        </FormControl>
        <S.Button type="submit">제출</S.Button>
      </Form>
    </LoginPageWrapper>
  );
};

export default SignupPage;
