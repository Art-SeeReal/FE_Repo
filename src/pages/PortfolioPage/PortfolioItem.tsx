import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as S from '../../components/styles';
import PostThumbnail from '../../components/PostThumbnail';
import ScrapPost from '../../components/ScrapPost';
import LikeUser from '../../components/LikeUser';

import { PortfoliosTypes } from '../../model/portfolios';

interface Props {
  data: PortfoliosTypes;
}

const StyledPortfolioItem = styled.div`
  position: relative;
  width: calc((100% / 3) - (((3 - 1) / 3) * 4rem));
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-0.6rem);

    .details {
      background-color: rgba(0, 0, 0, 0.2);
    }

    .title {
      text-decoration: underline;
    }
  }

  ${S.Media.tablet`
  width: calc((100% / 2) - (((2 - 1) / 2) * 4rem));
  `}

  ${S.Media.mobile`
    width: 100%;
  `}

  .details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    .writer-info {
      display: flex;
      gap: 0.6rem;
      justify-content: flex-end;
    }

    .title-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        margin-top: 0.4rem;
        flex: 0 0 80%;
      }
    }
  }
`;

const PortfolioItem = ({ data }: Props) => {
  const navigate = useNavigate();

  const goToPortfolioDetail = () => {
    navigate(`/portfolios/${data.id}`);
  };

  return (
    <StyledPortfolioItem onClick={goToPortfolioDetail}>
      <PostThumbnail>
        <img src={data?.imageUrl} alt={data?.title} />

        <div className="details">
          <div className="writer-info">
            <p>{data.nickname}</p>
            <LikeUser userId={data.userId} isLike={data?.isLike} />
          </div>

          <div className="mt-auto">
            <S.Description $size="small">{data?.fields.label}</S.Description>

            <div className="title-wrap">
              <S.EllipsisText className="title">{data?.title}</S.EllipsisText>

              <ScrapPost type="portfolio" postId={data?.id} isScrap={data?.isScrap} />
            </div>
          </div>
        </div>
      </PostThumbnail>
    </StyledPortfolioItem>
  );
};

export default PortfolioItem;
