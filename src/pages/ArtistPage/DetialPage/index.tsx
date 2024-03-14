import React from 'react';
import styled from 'styled-components';
import { RiHeartLine, RiEyeLine, RiStarLine, RiStarFill, RiHeartFill, RiCalendar2Line } from '@remixicon/react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetchArtistDetails } from '../../../hooks/useArtistQuery';
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

const SideCol = styled(Col)`
  background-color: #f0f0f0;
  padding: 20px;
`;

const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ArtistDetailPage = () => {
  const params = useParams();
  const userId = params.id;
  const { data: artistDetails } = useFetchArtistDetails(Number(userId));

  return (
    <div>
      <Row>
        <SideCol md="2" xl="3" />
        <Col xs="12" md="8" xl="6">
          <CenteredDiv>
            <OptionContainer>
              <ArtistName>{artistDetails?.artist}</ArtistName>
              <S.Button $size="xsmall">
                <RiHeartLine color="red" />
                <Count>{artistDetails?.like}</Count>
              </S.Button>
              <S.Button $size="xsmall">
                <RiHeartFill color="red" />
                <Count>{artistDetails?.like}</Count>
              </S.Button>
            </OptionContainer>
            <Title>{artistDetails?.title}</Title>
            <DetailsContainer>
              <OptionContainer>
                <S.Button $size="xsmall">
                  <RiCalendar2Line color="black" />
                  {artistDetails?.RegDate}
                </S.Button>
                <S.Button $size="xsmall">{artistDetails?.location}</S.Button>
                <S.Button $size="xsmall">{artistDetails?.field}</S.Button>
              </OptionContainer>
              <OptionContainer>
                <S.Button $size="xsmall">
                  <RiEyeLine color="black" />
                  <Count>{artistDetails?.view}</Count>
                </S.Button>
                <S.Button $size="xsmall">
                  <RiStarLine color="yellow" />
                  <Count>{artistDetails?.like}</Count>
                </S.Button>
                <S.Button $size="xsmall">
                  <RiStarFill color="yellow" />
                  <Count>{artistDetails?.like}</Count>
                </S.Button>
              </OptionContainer>
            </DetailsContainer>
            <ContentContainer>
              <p dangerouslySetInnerHTML={{ __html: artistDetails?.content ?? '' }} />
            </ContentContainer>
            <CenteredButtonContainer>
              <S.Button>수정하기</S.Button>
            </CenteredButtonContainer>
          </CenteredDiv>
        </Col>
        <SideCol md="2" xl="3" />
      </Row>
    </div>
  );
};

export default ArtistDetailPage;
