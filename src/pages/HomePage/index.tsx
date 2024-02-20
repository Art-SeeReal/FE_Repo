import React from 'react';
import BannerSlider from './BannerSlider';
import * as S from '../../components/styles';
import SectionCarousel from './SectionCarousel';
import { useFetchLatestPortfolios } from '../../hooks/usePortfolioQuery';
import { useFetchLatestRecruits } from '../../hooks/useRecruitQuery';

const HomePage = () => {
  const { data: latestPortfolios } = useFetchLatestPortfolios();
  const { data: latestRecruits } = useFetchLatestRecruits();

  return (
    <>
      <BannerSlider />
      <S.Container $paddingBottom>
        {latestPortfolios && (
          <SectionCarousel title="예술가 포트폴리오" data={latestPortfolios} routerPath="/portfolios" />
        )}
        {latestRecruits && <SectionCarousel title="기획자 공고" data={latestRecruits} routerPath="/recruits" />}
      </S.Container>
    </>
  );
};

export default HomePage;
