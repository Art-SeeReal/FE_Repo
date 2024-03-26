import React from 'react';
import styled from 'styled-components';
import Slider from '../../components/Slider';
import * as S from '../../components/styles';
import { useFetchBanners } from '../../hooks/query/useBannerQuery';

const StyledBanner = styled.div`
  position: relative;
  padding-top: 60rem;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BannerSlider = () => {
  const { data } = useFetchBanners();

  return (
    <S.Container $paddingBottom="6rem">
      <Slider
        options={{
          effect: 'fade',
          loopedSlides: data?.count,
          pagination: true,
        }}
      >
        {data?.results.map(({ id, imageUrl }) => (
          <StyledBanner key={id}>
            <img src={imageUrl} alt="" />
          </StyledBanner>
        ))}
      </Slider>
    </S.Container>
  );
};

export default BannerSlider;
