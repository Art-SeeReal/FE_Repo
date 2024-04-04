import React from 'react';
import BannerSlider from './BannerSlider';
import SectionCarousel from './SectionCarousel';
import { useFetchLatestPortfolios } from '../../hooks/query/usePortfolioQuery';
import { useFetchLatestRecruits } from '../../hooks/query/useRecruitQuery';

const HomePage = () => {
  const { data: latestPortfolios } = useFetchLatestPortfolios();
  const { data: latestRecruits } = useFetchLatestRecruits();

  return (
    <>
      <BannerSlider />
      {latestPortfolios && (
        <SectionCarousel title="예술가 포트폴리오" data={latestPortfolios} routerPath="/portfolios" />
      )}
      {latestRecruits && <SectionCarousel title="기획자 공고" data={latestRecruits} routerPath="/recruits" />}
    </>
  );
};

export default HomePage;
