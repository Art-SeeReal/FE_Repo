import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiHeartFill, RiEyeLine } from '@remixicon/react';

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  padding-bottom: 100%;
  cursor: pointer;

  &:hover {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    filter: brightness(80%);
  }
`;

const Image = styled.img<{ id: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const ArtistInfo = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  z-index: 2;
`;

const ArtistName = styled.div`
  font-size: 30px;
  font-weight: bold;

  @media (max-width: 1200px) {
    font-size: 26px;
  }

  @media (max-width: 960px) {
    font-size: 20px;
  }

  @media (max-width: 760px) {
    font-size: 16px;
  }

  @media (max-width: 560px) {
    font-size: 14px;
    text-align: center;
  }
`;

const LikeAndView = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  color: white;
  z-index: 2;

  & > * {
    margin-right: 2px;
  }

  @media (max-width: 560px) {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Title = styled.div<{ isVisible: boolean }>`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 40px;
  font-weight: bold;
  color: white;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @media (max-width: 1200px) {
    font-size: 36px;
  }

  @media (max-width: 960px) {
    font-size: 30px;
  }

  @media (max-width: 760px) {
    font-size: 18px;
  }

  @media (max-width: 560px) {
    font-size: 14px;
  }
`;

const LocationAndField = styled.div<{ isVisible: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 16px;
  color: white;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @media (max-width: 760px) {
    font-size: 14px;
  }

  @media (max-width: 560px) {
    font-size: 12px;
    text-align: center;
  }
`;

export interface PortfolioProps {
  portfolioProps: {
    id: number;
    imageUrl: string;
    title: string;
    artist: string;
    location: {
      code: string;
      label: string;
    };
    field: {
      code: string;
      label: string;
    };
    like: number;
    view: number;
    RegDate: string;
  };
}

const PortfolioImagesComponent = ({ portfolioProps }: PortfolioProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/portfolios/${portfolioProps.id}`);
  };

  return (
    <ImageWrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <ImageContainer onClick={handleImageClick}>
        <Image id={portfolioProps.id} src={portfolioProps.imageUrl} alt={portfolioProps.title} />
        <ArtistInfo style={{ opacity: isHovered ? 1 : 0 }}>
          <ArtistName>{portfolioProps.artist}</ArtistName>
        </ArtistInfo>
        <LikeAndView style={{ opacity: isHovered ? 1 : 0 }}>
          <RiEyeLine />
          {portfolioProps.like}
          <RiHeartFill /> {portfolioProps.view}
        </LikeAndView>
        <Title isVisible={isHovered}>{portfolioProps.title}</Title>
        <LocationAndField isVisible={isHovered}>
          {portfolioProps.location.label} - {portfolioProps.field.label}
        </LocationAndField>
      </ImageContainer>
    </ImageWrapper>
  );
};

export default PortfolioImagesComponent;
