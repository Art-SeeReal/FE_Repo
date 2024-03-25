import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiStarLine } from '@remixicon/react';

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

export interface RecruitsProps {
  recruitsProps: {
    id: number;
    name: string;
    title: string;
    location: {
      code: string;
      label: string;
    };
    field: {
      code: string;
      label: string;
    };
    RegDate: string;
    content: string;
  };
}

const RecruitsImagesComponent = ({ recruitsProps }: RecruitsProps) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/recruits/${recruitsProps.id}`);
  };

  return (
    <ImageContainer onClick={handleImageClick}>
      <NameAndIconContainer>
        <PlannerName>{recruitsProps.name}</PlannerName>
        <RiStarLine />
      </NameAndIconContainer>
      <Title>{recruitsProps.title}</Title>
      <div>
        위치: {recruitsProps.location?.label} | 분야: {recruitsProps.field?.label}
      </div>
    </ImageContainer>
  );
};

export default RecruitsImagesComponent;
