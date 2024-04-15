import React from 'react';
import styled from 'styled-components';

const StyledErrorCode = styled.h1`
  font-size: 12rem;
  font-weight: 700;
`;

interface Props {
  status: number;
}

const ErrorCode = ({ status }: Props) => {
  const emojiStatus = String(status).replace(/0/g, '😥');

  return <StyledErrorCode>{emojiStatus}</StyledErrorCode>;
};

export default ErrorCode;
