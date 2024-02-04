import React from 'react';
import styled from 'styled-components';
import InputWithLabel from './InputWithLabel';

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

const SignupPage = () => {
  return (
    <LoginPageWrapper>
      <Title>회원가입</Title>
      <Subtitle>아트씨리얼에 오신 것을 환영합니다.</Subtitle>
      <Divider height="3px" />
      <InputWithLabel label="이름*" placeholder="이름" type="text" />
      <InputWithLabel label="닉네임*" placeholder="닉네임" type="text" />
      <InputWithLabel label="아이디*" placeholder="아이디" type="text" />
      <InputWithLabel label="비밀번호*" placeholder="비밀번호" type="text" />
      <InputWithLabel label="비밀번호 확인*" placeholder="비밀번호 확인" type="text" />
      <InputWithLabel label="이메일*" placeholder="이메일" type="text" />
      <InputWithLabel label="핸드폰 번호*" placeholder="핸드폰 번호" type="text" />
      <InputWithLabel label="지역" placeholder="지역" type="text" />
      <Label>회원 종류*</Label>
      <Divider />
      <Divider />
    </LoginPageWrapper>
  );
};

export default SignupPage;
