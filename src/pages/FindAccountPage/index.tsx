import React from 'react';
import * as S from '../../components/styles';

import FindUserIdForm from './FindUserIdForm';
import FindPasswordForm from './FindPasswordForm';

const FindAccountPage = () => {
  return (
    <S.Container $width={400}>
      <FindUserIdForm />
      <S.Divider />
      <FindPasswordForm />
    </S.Container>
  );
};

export default FindAccountPage;
