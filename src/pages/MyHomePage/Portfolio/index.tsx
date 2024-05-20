import React, { useState } from 'react';
import styled from 'styled-components';
import * as S from '../../../components/styles';
import InfiniteList from '../../../components/InfiniteList';
import PortfolioItem from '../../../components/PortfolioItem';
import { useFetchUserPortfolios } from '../../../hooks/query/useUserQuery';

const StyledPortfolioList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8rem 4rem;
  margin-top: 10rem;

  ${S.Media.mobile`
    gap: 4rem;
    margin-top: 5rem;
  `}
`;

const Portfolio = () => {
  const [page, setPage] = useState(20);
  const { data: PortfoliosData, refetch, isLoading, isFetching } = useFetchUserPortfolios({ page });
  const onLoadMore = () => {
    refetch();
    setPage(page + 20);
  };

  return (
    <InfiniteList onLoadMore={onLoadMore} isLoading={isLoading} isFetching={isFetching}>
      <StyledPortfolioList>
        {PortfoliosData?.results.map((portfolio) => <PortfolioItem key={portfolio.id} data={portfolio} />)}
      </StyledPortfolioList>
    </InfiniteList>
  );
};

export default Portfolio;
