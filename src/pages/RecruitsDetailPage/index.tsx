import React from 'react';
import styled from 'styled-components';
import { RiCalendar2Line } from '@remixicon/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDetailRecruits } from '../../hooks/query/useRecruitsQuery';
import * as S from '../../components/styles';

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

const DetailRecruitsPage = () => {
  const params = useParams();
  const userId = params.id;
  const { data: recruitsDetails } = useFetchDetailRecruits(Number(userId));
  const navigate = useNavigate();

  const goToModifyPage = () => {
    navigate(`/recruits/update/${userId}`);
  };

  return (
    <div>
      <CenteredDiv>
        <OptionContainer>
          <ArtistName>{recruitsDetails?.name}</ArtistName>
        </OptionContainer>
        <OptionContainer>
          <Title>{recruitsDetails?.title}</Title>
          <S.Button $size="large" onClick={goToModifyPage}>
            지원하기
          </S.Button>
        </OptionContainer>
        <DetailsContainer>
          <OptionContainer>
            <S.Button $size="xsmall">
              <RiCalendar2Line color="black" />
              {recruitsDetails?.RegDate}
            </S.Button>
            <S.Button $size="xsmall">{recruitsDetails?.location.label}</S.Button>
            <S.Button $size="xsmall">{recruitsDetails?.field}</S.Button>
          </OptionContainer>
        </DetailsContainer>
        <ContentContainer>
          <p dangerouslySetInnerHTML={{ __html: recruitsDetails?.content ?? '' }} />
        </ContentContainer>
        <CenteredButtonContainer>
          <S.Button onClick={goToModifyPage}>수정하기</S.Button>
        </CenteredButtonContainer>
      </CenteredDiv>
    </div>
  );
};

export default DetailRecruitsPage;
