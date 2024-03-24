import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as S from '../../components/styles';
import { useForm, IData } from '../../hooks/useFormState';
import Form from '../../components/Form';
import ErrorMessage from '../../components/ErrorMessage';
import { useToast } from '../../hooks/customs/useToastState';
import FormControl from '../../components/FormControl';
import {
  isValidName,
  isValidNickname,
  arePasswordsEqual,
  isValidEmail,
  isValidPassWord,
  isValidPhoneNum,
  isValidLocation,
  isValidValue,
} from '../../utils/validation';
import { useSignupQuery } from '../../hooks/query/userQueries';

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
  const navigate = useNavigate();
  const initialValue = {
    userName: '',
    userNickName: '',
    userPw: '',
    userPwCheck: '',
    userEmail: '',
    userPhoneNum: '',
    userLocation: '',
  };

  const { mutate: register, isSuccess } = useSignupQuery();

  const onSubmit = (values: IData<string>) => {
    register({
      signupData: {
        name: values.userName,
        nickName: values.userNickName,
        pw: values.userPw,
        pwCheck: values.userPwCheck,
        email: values.userEmail,
        phoneNum: values.userPhoneNum,
        location: values.userLocation,
      },
    });
  };

  const validate = (values: IData<string>) => {
    const errors: IData<string> = {};

    if (!isValidValue(values.userName)) {
      errors.userName = '이름을 입력하세요.';
    } else if (!isValidName(values.userName)) {
      errors.userName = '한글만 입력해주세요.';
    }

    if (!isValidValue(values.userNickName)) {
      errors.userNickName = '닉네임을 입력하세요.';
    } else if (!isValidNickname(values.userNickName)) {
      errors.userNickName = '닉네임은 한글, 영문, 숫자만 가능하며 2-12자리 가능합니다.';
    }

    if (!isValidValue(values.userEmail)) {
      errors.userEmail = '이메일을 입력하세요.';
    } else if (!isValidEmail(values.userEmail)) {
      errors.userEmail = '유효한 이메일 형식이 아닙니다. ex) artseereal@naver.com';
    }

    if (!isValidValue(values.userPw)) {
      errors.userPw = '패스워드를 입력하세요.';
    } else if (!isValidPassWord(values.userPw)) {
      errors.userPw = '영문, 숫자, 특수문자로 구성한 8자 이상의 비밀번호를 입력하세요.';
    }

    if (!isValidValue(values.userPwCheck)) {
      errors.userPwCheck = '패스워드를 입력하세요.';
    } else if (!arePasswordsEqual(values.userPw, values.userPwCheck)) {
      errors.userPwCheck = '비밀번호가 일치하지 않습니다.';
    }

    if (!isValidValue(values.userPhoneNum)) {
      errors.userPhoneNum = '핸드폰번호를 입력하세요.';
    } else if (!isValidPhoneNum(values.userPhoneNum)) {
      errors.userPhoneNum = '유효한 핸드폰 번호 형식이 아닙니다. ex) 01012341234';
    }

    if (!isValidValue(values.userLocation)) {
      errors.userLocation = '지역을 입력하세요.';
    } else if (!isValidLocation(values.userLocation)) {
      errors.userLocation = '한글만 입력해주세요.';
    }

    return errors;
  };

  const { errors, touched, getFieldProps, handleSubmit, resetForm } = useForm({
    initialValue,
    validate,
    onSubmit,
  });
  const { appendToast } = useToast();

  useEffect(() => {
    if (!isSuccess) return;
    resetForm();
    appendToast({ content: '작성 완료', type: 'success' });
    navigate('/');
  }, [isSuccess]);

  return (
    <LoginPageWrapper>
      <S.Title>회원가입</S.Title>
      <Subtitle>아트씨리얼에 오신 것을 환영합니다.</Subtitle>
      <Divider height="3px" />
      <Form id="signup-form" onSubmit={handleSubmit}>
        <FormControl
          label="이름"
          htmlFor="userName"
          required
          error={<ErrorMessage touched={touched.userName} message={errors.userName} />}
        >
          <S.Field id="userName" {...getFieldProps('userName')} type="text" placeholder="이름" />
        </FormControl>
        <FormControl
          label="닉네임"
          htmlFor="userNickName"
          required
          error={<ErrorMessage touched={touched.userNickName} message={errors.userNickName} />}
        >
          <S.Field id="userNickName" {...getFieldProps('userNickName')} type="text" placeholder="닉네임" />
        </FormControl>
        <FormControl
          label="이메일"
          htmlFor="userEmail"
          required
          error={<ErrorMessage touched={touched.userEmail} message={errors.userEmail} />}
        >
          <S.Field id="userEmail" {...getFieldProps('userEmail')} type="email" placeholder="이메일" />
        </FormControl>
        <FormControl
          label="비밀번호"
          htmlFor="userPw"
          required
          error={<ErrorMessage touched={touched.userPw} message={errors.userPw} />}
        >
          <S.Field id="userPw" {...getFieldProps('userPw')} type="password" placeholder="비밀번호" />
        </FormControl>
        <FormControl
          label="비밀번호확인"
          htmlFor="userPwCheck"
          required
          error={<ErrorMessage touched={touched.userPwCheck} message={errors.userPwCheck} />}
        >
          <S.Field id="userPwCheck" {...getFieldProps('userPwCheck')} type="password" placeholder="비밀번호확인" />
        </FormControl>
        <FormControl
          label="핸드폰번호"
          htmlFor="userPhoneNum"
          required
          error={<ErrorMessage touched={touched.userPhoneNum} message={errors.userPhoneNum} />}
        >
          <S.Field id="userPhoneNum" {...getFieldProps('userPhoneNum')} type="text" placeholder="핸드폰번호" />
        </FormControl>
        <FormControl
          label="지역"
          htmlFor="userLocation"
          required
          error={<ErrorMessage touched={touched.userLocation} message={errors.userLocation} />}
        >
          <S.Field id="userLocation" {...getFieldProps('userLocation')} type="text" placeholder="지역" />
        </FormControl>
        <S.Button type="submit">제출</S.Button>
      </Form>
    </LoginPageWrapper>
  );
};

export default SignupPage;
