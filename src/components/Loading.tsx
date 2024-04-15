import React from 'react';
import { CircleLoader } from 'react-spinners';
import * as S from './styles';

const Loading = () => {
  return (
    <S.Row $justifyContent="center">
      <CircleLoader color="#E58AE6" />
    </S.Row>
  );
};

export default Loading;
