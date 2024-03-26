import React from 'react';
import styled from 'styled-components';
// import FindId from './FindId';
// import FindPw from './FindPw';

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

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000;
  margin: 10px 0;
`;

const FindIdPwPage = () => {
  return (
    <Wrapper>
      {/* <FindId /> */}
      <StyledDivider />
      {/* <FindPw /> */}
    </Wrapper>
  );
};

export default FindIdPwPage;
