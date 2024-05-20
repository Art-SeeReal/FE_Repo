import React from 'react';
import styled from 'styled-components';
import { useFetchLikePlanner } from '../../../hooks/query/useUserQuery';
import * as S from '../../../components/styles';
import LikeUser from '../../../components/LikeUser';

const StyledLikeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin-top: 10rem;

  ${S.Media.mobile`
    gap: 2rem;
    margin-top: 5rem;
  `}
`;

const LikeAvatarBox = styled.div`
  position: relative;
  width: calc((100% / 6) - (((6 - 1) / 6) * 4rem));
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  border: 1px solid #ccc;
  border-radius: 0.8rem;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    transform: translateY(-0.6rem);
    border: 1px solid #e58ae6;
  }

  ${S.Media.tablet`
    width: calc((100% / 4) - (((4 - 1) / 4) * 4rem));
  `}

  ${S.Media.mobile`
  width: calc((100% / 3) - (((3 - 1) / 3) * 4rem));
  `}

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 18rem;

  p {
    margin: 1rem;
  }
`;

const Planner = () => {
  const { data } = useFetchLikePlanner();

  return (
    <S.Container>
      <StyledLikeList>
        {data?.results.map((item) => (
          <LikeAvatarBox key={item.userId}>
            <S.Row $justifyContent="center">
              <p>{item.userType.label}</p>
            </S.Row>
            <S.Row $justifyContent="center">
              <S.EllipsisText className="title">{item.nickname}</S.EllipsisText>
            </S.Row>
            <S.Button $size="xsmall" $inline $style="link">
              {item?.userId && <LikeUser userId={item?.userId} isLike />}
            </S.Button>
          </LikeAvatarBox>
        ))}
      </StyledLikeList>
    </S.Container>
  );
};

export default Planner;
