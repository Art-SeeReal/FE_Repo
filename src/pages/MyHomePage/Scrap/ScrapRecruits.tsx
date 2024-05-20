import React, { useState } from 'react';
import styled from 'styled-components';

import * as S from '../../../components/styles';
import RecruitItem from '../../../components/RecruitItem';
import InfiniteList from '../../../components/InfiniteList';
import { useFetchScrapRecruits } from '../../../hooks/query/useUserQuery';

const StyledRecruitList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin-top: 10rem;

  ${S.Media.tablet`
    gap: 2rem;
  `}

  ${S.Media.mobile`
    margin-top: 5rem;
  `}
`;

const ScrapRecruits = () => {
  const [page, setPage] = useState(20);
  const { data: ScrapRecruitsData, refetch, isLoading, isFetching } = useFetchScrapRecruits({ page });

  const onLoadMore = () => {
    refetch();
    setPage(page + 20);
  };

  return (
    <InfiniteList onLoadMore={onLoadMore} isLoading={isLoading} isFetching={isFetching}>
      <StyledRecruitList>
        {ScrapRecruitsData?.results.map((recruit) => <RecruitItem key={recruit.id} data={recruit} />)}
      </StyledRecruitList>
    </InfiniteList>
  );
};

export default ScrapRecruits;
