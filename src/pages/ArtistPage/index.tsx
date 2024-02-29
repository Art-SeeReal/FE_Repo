import React from 'react';
import styled from 'styled-components';
import ArtistImagesComponent from './ArtistImagesComponent'; // Import the new component
import * as S from '../../components/styles';
import { useFetchArtist } from '../../hooks/useArtistQuery';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const DropdownMenu = styled.div`
  position: relative;
`;

const SearchBox = styled.input`
  margin-left: 10px;
  padding: 5px;
`;

const RegisterButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  width: 48%; /* Two images in a row with a small gap */
  margin-bottom: 10px;
  padding: 50px;
`;

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

const IndexPage = () => {
  const { data } = useFetchArtist();
  return (
    <div>
      <HeaderContainer>
        <DropdownMenu>
          <select>
            <option value="area1">지역1</option>
            <option value="area2">지역2</option>
          </select>
          <select>
            <option value="field1">분야1</option>
            <option value="field2">분야2</option>
          </select>
        </DropdownMenu>

        <SearchBox type="text" placeholder="검색" />

        <RegisterButton>등록하기</RegisterButton>
      </HeaderContainer>
      <S.Container $paddingBottom>
        {data && (
          <ImageContainer>
            {data?.results.map((image: ImageData) => (
              <ImageWrapper key={image.id}>
                <ArtistImagesComponent image={image} />
              </ImageWrapper>
            ))}
          </ImageContainer>
        )}
      </S.Container>
    </div>
  );
};

export default IndexPage;
