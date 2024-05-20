import React from 'react';
import styled from 'styled-components';

import * as S from '../../../components/styles';
import InfiniteList from '../../../components/InfiniteList';
import { useFetchAuthorApplyStatus, useFetchPlannerApplyStatus } from '../../../hooks/query/useUserQuery';
import AuthorApplyStatus from './AuthorApplyStatus';
import { UserTypeAuthor, UserTypePlanner } from '../../../utils/constants';
import PlannerApplyStatus from './PlannerApplyStatus';

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

interface ApplyStatueProps {
  userType: string;
}

const ApplyStatus = ({ userType }: ApplyStatueProps) => {
  const {
    data: authorApplyStatusData,
    refetch: authorRefetch,
    isLoading: authorIsLoading,
    isFetching: authorIsFetching,
  } = useFetchAuthorApplyStatus();
  const {
    data: plannerApplyStatusData,
    refetch: plannerRefetch,
    isLoading: plannerIsLoading,
    isFetching: plannerIsFetching,
  } = useFetchPlannerApplyStatus();

  const onLoadMore = () => {
    if (userType === UserTypeAuthor) {
      authorRefetch();
    } else if (userType === UserTypePlanner) {
      plannerRefetch();
    }
  };

  return (
    <InfiniteList
      onLoadMore={onLoadMore}
      isLoading={userType === UserTypeAuthor ? authorIsLoading : plannerIsLoading}
      isFetching={userType === UserTypeAuthor ? authorIsFetching : plannerIsFetching}
    >
      <StyledRecruitList>
        {userType === UserTypeAuthor &&
          authorApplyStatusData?.results.map((recruit) => <AuthorApplyStatus key={recruit.id} data={recruit} />)}
        {userType === UserTypePlanner &&
          plannerApplyStatusData?.results.map((recruit) => <PlannerApplyStatus key={recruit.id} data={recruit} />)}
      </StyledRecruitList>
    </InfiniteList>
  );
};

export default ApplyStatus;
