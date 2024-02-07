import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import InputWithLabel from './InputWithLabel';
import CheckBox from './CheckBox';
import { SignUp } from '../../model/UserTypes';
import {
  arePasswordsEqual,
  isValidCheckBox,
  isValidEmail,
  isValidId,
  isValidName,
  isValidNickName,
  isValidPassWord,
  isValidPhoneNum,
} from '../../utils/Validation';
import { registerUser } from '../../hooks/userQueries';

interface DividerProps {
  height?: string;
}

const LoginPageWrapper = styled.div`
  display: flex;
  margin: auto;
  padding: 50px 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  min-width: 500px;
  max-width: 700px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
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

const Label = styled.div`
  align-self: flex-start;
  font-weight: bold;
  margin-left: 10px; /* 원하는 여백 크기로 조절하세요 */
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row; /* Updated style to display checkboxes in a row */
`;

const SignupButton = styled.button`
  background-color: #007bff;
  margin: 20px 0;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
`;

const SignupPage = () => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const queryClient = useQueryClient();

  const nameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const checkbox1Ref = useRef<HTMLInputElement>(null);
  const checkbox2Ref = useRef<HTMLInputElement>(null);

  const handleCheckbox1 = () => {
    setCheckbox1(true);
    setCheckbox2(false);
  };
  const handleCheckbox2 = () => {
    setCheckbox2(true);
    setCheckbox1(false);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const { mutate: register } = useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      alert('회원가입 성공');
    },
  });

  const signUp = () => {
    if (!isValidName(name)) {
      alert('이름을 입력해주세요.');
      if (nameRef.current) nameRef.current.focus();
    } else if (!isValidNickName(nickName)) {
      alert('닉네임 유효성 검사 실패');
      if (nickNameRef.current) nickNameRef.current.focus();
    } else if (!isValidId(id)) {
      alert('아이디 유효성 검사 실패');
      if (idRef.current) idRef.current.focus();
    } else if (!isValidPassWord(password)) {
      alert('비밀번호 유효성 검사 실패');
      if (passwordRef.current) passwordRef.current.focus();
    } else if (!arePasswordsEqual(password, passwordConfirmation)) {
      alert('비밀번호가 일치하지 않습니다.');
      if (passwordConfirmationRef.current) passwordConfirmationRef.current.focus();
    } else if (!isValidEmail(email)) {
      alert('이메일 유효성 검사 실패');
      if (emailRef.current) emailRef.current.focus();
    } else if (!isValidPhoneNum(phoneNumber)) {
      alert('휴대폰 번호 유효성 검사 실패');
      if (phoneNumberRef.current) phoneNumberRef.current.focus();
    } else if (!isValidCheckBox(checkbox1, checkbox2)) {
      alert('회원 종류를 선택해주세요.');
      if (checkbox1Ref.current) checkbox1Ref.current.focus();
    } else {
      const signUpData: SignUp = {
        name,
        nickName,
        id,
        password,
        email,
        phoneNumber,
        location,
        checkbox1,
        checkbox2,
      };
      register(signUpData);
    }
  };
  const errorTxt = '필수';
  return (
    <LoginPageWrapper>
      <Title>회원가입</Title>
      <Subtitle>아트씨리얼에 오신 것을 환영합니다.</Subtitle>
      <Divider height="3px" />
      <InputWithLabel
        id="name"
        label="이름*"
        placeholder="이름"
        type="text"
        onChange={onChangeName}
        text={errorTxt}
        inputRef={nameRef}
      />
      <InputWithLabel
        id="nickname"
        label="닉네임*"
        placeholder="닉네임"
        type="text"
        onChange={onChangeNickName}
        text={errorTxt}
        inputRef={nickNameRef}
      />
      <InputWithLabel
        id="id"
        label="아이디*"
        placeholder="아이디"
        type="text"
        onChange={onChangeId}
        text={errorTxt}
        inputRef={idRef}
      />
      <InputWithLabel
        id="pw"
        label="비밀번호*"
        placeholder="비밀번호"
        type="password"
        onChange={onChangePassword}
        text={errorTxt}
        inputRef={passwordRef}
      />
      <InputWithLabel
        id="pwCheck"
        label="비밀번호 확인*"
        placeholder="비밀번호 확인"
        type="password"
        onChange={onChangePasswordConfirmation}
        text={errorTxt}
        inputRef={passwordConfirmationRef}
      />
      <InputWithLabel
        id="email"
        label="이메일*"
        placeholder="이메일"
        type="email"
        onChange={onChangeEmail}
        text={errorTxt}
        inputRef={emailRef}
      />
      <InputWithLabel
        id="phonNum"
        label="핸드폰 번호*"
        placeholder="핸드폰 번호"
        type="tel"
        onChange={onChangePhoneNumber}
        text={errorTxt}
        inputRef={phoneNumberRef}
      />
      <InputWithLabel
        id="location"
        label="지역"
        placeholder="지역"
        type="text"
        onChange={onChangeLocation}
        text={errorTxt}
      />
      <Label>회원 종류* {errorTxt}</Label>
      <Divider />
      <CheckboxContainer>
        <CheckBox label="작가" checked={checkbox1} onChange={handleCheckbox1} inputRef={checkbox1Ref} />
        <CheckBox label="기획자" checked={checkbox2} onChange={handleCheckbox2} inputRef={checkbox2Ref} />
      </CheckboxContainer>
      <Divider />
      <SignupButton onClick={signUp}>회원가입</SignupButton>
    </LoginPageWrapper>
  );
};

export default SignupPage;
