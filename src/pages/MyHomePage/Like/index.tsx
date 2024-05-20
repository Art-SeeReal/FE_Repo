import React from 'react';
import * as S from '../../../components/styles';
import Tabs from '../../../components/Tabs';
import Author from './Author';
import Planner from './Planner';

const Like = () => {
  const tabTitles = ['작가', '기획자'];
  const tabContents = [<Author />, <Planner />];

  return (
    <S.Container>
      <Tabs tabTitles={tabTitles} tabContents={tabContents} $size="medium" />
    </S.Container>
  );
};

export default Like;
