// ArtistImagesComponent.tsx

import React from 'react';
import styled from 'styled-components';

interface ImageData {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  location: string;
  field: string;
  like: number;
  view: number;
  RegDate: string;
}

interface ArtistImagesComponentProps {
  image: ImageData;
}

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: 100%; /* 1:1 ratio, creating a square box */
  position: relative;
  overflow: hidden;
  margin-bottom: 10px; /* Add margin between images */

  @media (min-width: 768px) {
    margin-right: 10px; /* Adjust margin for larger screens */
  }

  @media (min-width: 1024px) {
    margin-right: 20px; /* Adjust margin for even larger screens */
  }
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArtistImagesComponent = ({ image }: ArtistImagesComponentProps) => {
  return (
    <ImageContainer>
      <Image src={image.imageUrl} alt={image.title} />
    </ImageContainer>
  );
};

export default ArtistImagesComponent;
