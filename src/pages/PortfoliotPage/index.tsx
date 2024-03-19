import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRecoilValue } from 'recoil';
import { ImageTypes } from '../../model/PortfolioTypes';
import PortfolioImagesComponent from './PortfolioImagesComponent';
import * as S from '../../components/styles';
import { useFetchPortfolio } from '../../hooks/usePortfoliosQuery';
import HeaderContainer from './HeaderContainer';
import { portfolioDataSelector } from '../../recoil/selectors/portfolioBoardSelectors';
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

const PortfolioPage = () => {
  const PortfolioDataSelectorState = useRecoilValue(portfolioDataSelector);
  const { isLoading, isError } = useFetchPortfolio();
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
              {PortfolioDataSelectorState?.slice(startIndex, endIndex).map((image: ImageTypes) => (
                <ImageWrapper key={image.id}>
                  <PortfolioImagesComponent image={image} />
                </ImageWrapper>
              ))}
            </ImageContainer>
            <Stack spacing={2} direction="row" justifyContent="center">
              <Pagination
                count={Math.ceil((PortfolioDataSelectorState?.length ?? 0) / ITEMS_PER_PAGE)}
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

export default PortfolioPage;
