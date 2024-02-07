import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFindIdQuery, useFindPwQuery } from '../../hooks/userQueries';

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  padding: 50px 0;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  min-width: 400px;
  max-width: 600px;
`;

const Title = styled.h4`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  align-self: flex-start;
  font-weight: bold;
  margin: 5px 0 5px 5px;
`;

const StyledInput = styled.input`
  width: 100%;
  min-width: 350px;
  max-width: 400px;
  padding: 5px;
  margin-bottom: 10px;
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000;
  margin: 10px 0;
`;

const SignupButton = styled.button`
  background-color: #007bff;
  margin: 20px 0;
  color: #fff;
  padding: 3px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
`;

const StyledLabelWrapper = styled.div`
  align-self: center;
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const FindIdPwPage = () => {
  const [foundId, setFoundId] = useState<string>('');
  const [foundPw, setFoundPw] = useState<string>('');
  const [formIdData, setFormIdData] = useState({
    name: '',
    email: '',
  });
  const [formPwData, setFormPwData] = useState({
    name: '',
    email: '',
    id: '',
  });

  const findIdQuery = useFindIdQuery({ name: formIdData.name, email: formIdData.email });
  const findPwQuery = useFindPwQuery({ name: formPwData.name, email: formPwData.email, id: formPwData.id });

  const onChangeIdName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormIdData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };

  const onChangeIdEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormIdData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const onChangePwName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPwData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };

  const onChangePwEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPwData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const onChangePwID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormPwData((prevData) => ({
      ...prevData,
      id: e.target.value,
    }));
  };

  const findId = () => {
    findIdQuery.refetch();
  };

  const findPw = () => {
    findPwQuery.refetch();
  };

  useEffect(() => {
    if (findIdQuery.isSuccess) {
      setFoundId(findIdQuery.data?.id);
    }
  }, [findIdQuery.isSuccess]);

  useEffect(() => {
    if (findPwQuery.isSuccess) {
      console.log('성공');
      setFoundPw(findPwQuery.data?.password);
    }
  }, [findPwQuery.isSuccess]);

  return (
    <Wrapper>
      <Title>ID 찾기</Title>
      <StyledLabelWrapper>
        <StyledLabel>이름</StyledLabel>
        <StyledInput type="text" placeholder="이름" onChange={onChangeIdName} />
      </StyledLabelWrapper>
      <StyledLabelWrapper>
        <StyledLabel>이메일</StyledLabel>
        <StyledInput type="text" placeholder="이메일" onChange={onChangeIdEmail} />
      </StyledLabelWrapper>
      <StyledLabelWrapper>
        <SignupButton onClick={findId}>찾기</SignupButton>
        {foundId && (
          <StyledLabelWrapper>
            <p>찾은 아이디: {foundId}</p>
          </StyledLabelWrapper>
        )}
      </StyledLabelWrapper>
      <StyledDivider />
      <Title>PW 찾기</Title>
      <StyledLabelWrapper>
        <StyledLabel>이름</StyledLabel>
        <StyledInput type="text" placeholder="이름" onChange={onChangePwName} />
      </StyledLabelWrapper>
      <StyledLabelWrapper>
        <StyledLabel>이메일</StyledLabel>
        <StyledInput type="text" placeholder="이메일" onChange={onChangePwEmail} />
      </StyledLabelWrapper>
      <StyledLabelWrapper>
        <StyledLabel>아이디</StyledLabel>
        <StyledInput type="text" placeholder="아이디" onChange={onChangePwID} />
      </StyledLabelWrapper>
      <StyledLabelWrapper>
        <SignupButton onClick={findPw}>찾기</SignupButton>
        {foundPw && (
          <StyledLabelWrapper>
            <p>찾은 비밀번호: {foundPw}</p>
          </StyledLabelWrapper>
        )}
      </StyledLabelWrapper>
    </Wrapper>
  );
};

export default FindIdPwPage;
