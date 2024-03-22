import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiStarLine } from '@remixicon/react';
import { RecruitsTypes } from '../../model/RecruitsTypes';

const ImageContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 30px;
  margin: 20px;
  width: 300px;
  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* 호버할 때 그림자 추가 */
  }
`;

const NameAndIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PlannerName = styled.div`
  text-align: left;
  font-weight: bold;
`;

const Title = styled.div`
  text-align: left;
  font-size: 20px;
  margin-bottom: 10px;
`;

const RecruitsImagesComponent = ({ data }: { data: RecruitsTypes }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/recruits/${data.id}`);
  };
  useEffect(() => {
    console.log(data.location);
  }, [data.location]);
  return (
    <ImageContainer onClick={handleImageClick}>
      <NameAndIconContainer>
        <PlannerName>{data.name}</PlannerName>
        <RiStarLine />
      </NameAndIconContainer>
      <Title>{data.title}</Title>
      <div>
        위치: {data.location.label} | 분야: {data.field}
      </div>
    </ImageContainer>
  );
};

export default RecruitsImagesComponent;
