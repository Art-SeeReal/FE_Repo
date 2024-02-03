import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useLoginQuery } from '../../hooks/userQueries';
import { UserState } from '../../recoil/atoms/userState';

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 400px;
  padding: 10px;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  width: 400px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 400px;
`;

const LinkText = styled.span`
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
`;

const LoginForm = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const { isSuccess, refetch } = useLoginQuery({ id, pw });
  const setUserState = useSetRecoilState(UserState);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handleLogin = () => {
    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      setUserState(true);
    }
  }, [isSuccess]);

  return (
    <LoginPageWrapper>
      <Title>로그인</Title>
      <Subtitle>아트씨리얼에 오신 것을 환영합니다.</Subtitle>
      <Input type="text" placeholder="아이디" value={id} onChange={handleIdChange} />
      <Input type="password" placeholder="비밀번호" value={pw} onChange={handlePwChange} />
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <LinkWrapper>
        <LinkText>ID/PW 찾기</LinkText>
        <LinkText>회원가입</LinkText>
      </LinkWrapper>
    </LoginPageWrapper>
  );
};

export default LoginForm;
