import React from 'react';
import * as S from './styles';

interface Props {
  touched: boolean;
  message: string;
}

const ErrorMessage = ({ touched, message }: Props) => {
  if (!touched || !message) return null;
  return <S.ErrorMessage>{message}</S.ErrorMessage>;
};

export default ErrorMessage;
