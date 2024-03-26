import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { RiArrowUpDoubleFill } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';
import PortfolioImagesComponent from './PortfolioImagesComponent';
import * as S from '../../components/styles';
import { useFetchPortfolios } from '../../hooks/query/usePortfoliosQuery';
import Loading from '../../components/Loading';

const HeaderContainerStyle = styled.div`
  display: flex;
  justify-content: flex-end;
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

interface PortfolioPropsTypes {
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
}

const PortfolioPage = () => {
  const [page, setPage] = useState(10);
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 1,
  });
  const {
    data: portfolioData,
    refetch,
    isLoading,
    isError,
  } = useFetchPortfolios({
    page,
  });

  const goToRegisterPage = () => {
    navigate('/portfolios/register');
  };

  useEffect(() => {
    if (inView && !isLoading) {
      refetch();
      setPage(page + 10);
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
        <S.Button onClick={goToRegisterPage}>등록하기</S.Button>
      </HeaderContainerStyle>
      <S.Container $paddingBottom>
        {isLoading ? (
          <Loading />
        ) : (
          <ImageContainer>
            {portfolioData?.results.map((portfolioProps: PortfolioPropsTypes) => (
              <ImageWrapper key={portfolioProps.id}>
                <PortfolioImagesComponent portfolioProps={portfolioProps} />
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
