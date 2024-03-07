import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRecoilValue } from 'recoil';
import { ImageData } from '../../model/ArtistTypes';
import ArtistImagesComponent from './ArtistImagesComponent';
import * as S from '../../components/styles';
import { useFetchArtist } from '../../hooks/useArtistQuery';
import HeaderContainer from './HeaderContainer';
import { artistDataSelector } from '../../recoil/selectors/artistBoardSelectors';
import Loading from '../../components/Loading';

const HeaderContainerStyle = styled.div`
  align-items: center;
  padding: 10px 50px;
  margin: 0 auto;
  @media (max-width: 760px) {
    padding: 30px;
  }
  @media (max-width: 560px) {
    padding: 10px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  width: calc((100% - 20px) / 2);
  margin-bottom: 10px;
  padding: 50px;

  @media (max-width: 760px) {
    padding: 30px;
  }

  @media (max-width: 560px) {
    padding: 10px;
  }
`;

const ITEMS_PER_PAGE = 10;

const IndexPage = () => {
  const artistDataSelectorState = useRecoilValue(artistDataSelector);
  const { isLoading, isError } = useFetchArtist();
  const [page, setPage] = useState(1);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  if (isError) {
    <div>에러</div>;
  }
  return (
    <div>
      <HeaderContainerStyle>
        <HeaderContainer />
      </HeaderContainerStyle>
      <S.Container $paddingBottom>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ImageContainer>
              {artistDataSelectorState.slice(startIndex, endIndex).map((image: ImageData) => (
                <ImageWrapper key={image.id}>
                  <ArtistImagesComponent image={image} />
                </ImageWrapper>
              ))}
            </ImageContainer>
            <Stack spacing={2} direction="row" justifyContent="center">
              <Pagination
                count={Math.ceil(artistDataSelectorState.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={handleChangePage}
                color="secondary"
                size="large"
              />
            </Stack>
          </>
        )}
      </S.Container>
    </div>
  );
};

export default IndexPage;
