import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';
import { RiArrowUpDoubleFill } from '@remixicon/react';
import { ImageTypes } from '../../model/apiTypes';
import PortfolioImagesComponent from './PortfolioImagesComponent';
import * as S from '../../components/styles';
import { useFetchPortfolios } from '../../hooks/query/usePortfoliosQuery';
import HeaderContainer from './HeaderContainer';
import { portfolioDataState } from '../../recoil/atoms/portfolioBoardState';
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

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 20px;
  z-index: 1000;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const PortfolioPage = () => {
  const portfolioData = useRecoilValue(portfolioDataState);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: 1,
  });
  const { refetch, isLoading, isError } = useFetchPortfolios(page * 10);

  useEffect(() => {
    if (inView && !isLoading) {
      refetch();
      setPage(page + 1);
    }
  }, [inView, isLoading]);

  if (isError) {
    return <div>에러</div>;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <HeaderContainerStyle>
        <HeaderContainer />
      </HeaderContainerStyle>
      <S.Container $paddingBottom>
        {isLoading ? (
          <Loading />
        ) : (
          <ImageContainer>
            {portfolioData?.map((image: ImageTypes) => (
              <ImageWrapper key={image.id}>
                <PortfolioImagesComponent image={image} />
              </ImageWrapper>
            ))}
          </ImageContainer>
        )}
      </S.Container>
      <div ref={ref} style={{ height: 50 }} />
      <ScrollToTopButton onClick={scrollToTop}>
        <RiArrowUpDoubleFill />
      </ScrollToTopButton>
    </div>
  );
};

export default PortfolioPage;
