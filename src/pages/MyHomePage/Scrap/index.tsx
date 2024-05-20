import React from 'react';
import * as S from '../../../components/styles';
import Tabs from '../../../components/Tabs';
import ScrapPortfolios from './ScrapPortfolios';
import ScrapRecruits from './ScrapRecruits';

const Scrap = () => {
  const tabTitles = ['포트폴리오', '공고'];
  const tabContents = [<ScrapPortfolios />, <ScrapRecruits />];

  return (
    <S.Container>
      <Tabs tabTitles={tabTitles} tabContents={tabContents} $size="medium" />
    </S.Container>
  );
};

export default Scrap;
