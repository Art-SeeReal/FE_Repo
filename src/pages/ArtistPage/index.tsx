import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ImageData } from '../../model/ArtistTypes';
import ArtistImagesComponent from './ArtistImagesComponent';
import * as S from '../../components/styles';
import { useFetchArtist } from '../../hooks/useArtistQuery';
import HeaderContainer from './HeaderContainer';
import { artistState } from '../../recoil/atoms/artistBoardState';
import { artistDataSelector } from '../../recoil/selectors/artistBoardSelectors';

const HeaderContainerStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  margin: 0 auto; /* 가운데 정렬을 위해 추가 */
  max-width: 1200px; /* 원하는 최대 너비 설정 */
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
  const setArtistDataState = useSetRecoilState(artistState);
  const artistDataSelectorState = useRecoilValue(artistDataSelector);
  const { data } = useFetchArtist();
  const [page, setPage] = useState(1);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (data) {
      setArtistDataState(data.results);
    }
  }, [data]);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <div>
      <HeaderContainerStyle>
        <HeaderContainer />
      </HeaderContainerStyle>
      <S.Container $paddingBottom>
        {artistDataSelectorState && (
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
