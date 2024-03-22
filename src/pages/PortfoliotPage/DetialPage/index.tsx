import React from 'react';
import styled from 'styled-components';
import { RiHeartLine, RiEyeLine, RiStarLine, RiStarFill, RiHeartFill, RiCalendar2Line } from '@remixicon/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDetailPortfolio } from '../../../hooks/usePortfoliosQuery';
import * as S from '../../../components/styles';

const ArtistName = styled.div`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

  ${S.Button} {
    margin: 2px;
  }
`;

const Title = styled.div`
  font-size: 40px;
  margin-top: 10px;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled.span`
  margin-left: 5px;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
  min-height: 600px;

  p {
    margin: 0;
  }
`;
const CenteredDiv = styled.div`
  padding: 20px;
  margin: 5px;
`;

const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const DetailPortfolioPage = () => {
  const params = useParams();
  const userId = params.id;
  const { data: portfolioDetails } = useFetchDetailPortfolio(Number(userId));
  const navigate = useNavigate();

  const goToModifyPage = () => {
    navigate(`/portfolio/update/${userId}`);
  };

  return (
    <div>
      <CenteredDiv>
        <OptionContainer>
          <ArtistName>{portfolioDetails?.artist}</ArtistName>
          <S.Button $size="xsmall">
            <RiHeartLine color="red" />
            <Count>{portfolioDetails?.like}</Count>
          </S.Button>
          <S.Button $size="xsmall">
            <RiHeartFill color="red" />
            <Count>{portfolioDetails?.like}</Count>
          </S.Button>
        </OptionContainer>
        <Title>{portfolioDetails?.title}</Title>
        <DetailsContainer>
          <OptionContainer>
            <S.Button $size="xsmall">
              <RiCalendar2Line color="black" />
              {portfolioDetails?.RegDate}
            </S.Button>
            <S.Button $size="xsmall">{portfolioDetails?.location.label}</S.Button>
            <S.Button $size="xsmall">{portfolioDetails?.field}</S.Button>
          </OptionContainer>
          <OptionContainer>
            <S.Button $size="xsmall">
              <RiEyeLine color="black" />
              <Count>{portfolioDetails?.view}</Count>
            </S.Button>
            <S.Button $size="xsmall">
              <RiStarLine color="yellow" />
              <Count>{portfolioDetails?.like}</Count>
            </S.Button>
            <S.Button $size="xsmall">
              <RiStarFill color="yellow" />
              <Count>{portfolioDetails?.like}</Count>
            </S.Button>
          </OptionContainer>
        </DetailsContainer>
        <ContentContainer>
          <p dangerouslySetInnerHTML={{ __html: portfolioDetails?.content ?? '' }} />
        </ContentContainer>
        <CenteredButtonContainer>
          <S.Button onClick={goToModifyPage}>수정하기</S.Button>
        </CenteredButtonContainer>
      </CenteredDiv>
    </div>
  );
};

export default DetailPortfolioPage;
