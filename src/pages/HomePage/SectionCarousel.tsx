import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiMoreLine } from '@remixicon/react';
import Slider from '../../components/Slider';
import StyledTitle from '../../components/styles/Title';
import StyledButtonRouter from '../../components/styles/ButtonRouter';
import StyledRoundBox from '../../components/styles/RoundBox';

const StyledSection = styled.section`
  padding: 6rem 0;
`;

const StyledThumb = styled(StyledRoundBox)`
  position: relative;
  padding-top: 100%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledSlide = styled.div`
  a {
    &:hover {
      .title {
        text-decoration: underline;
      }
    }
  }

  .title {
    margin-top: 1em;
    font-size: var(--sub-title-3);
    text-align: center;
  }
`;

interface IData {
  results: { id: number; imageUrl: string; title: string }[];
  count: number;
}

interface Props {
  title: string;
  data: IData;
  routerPath: string;
}

const SectionCarousel = ({ title, data, routerPath }: Props) => (
  <StyledSection>
    <StyledTitle $size="large">{title}</StyledTitle>
    <Slider
      options={{
        slidesPerView: 3,
        spaceBetween: 80,
        loopedSlides: data?.count,
        autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
        speed: 4000,
      }}
    >
      {data?.results.map(({ id, imageUrl, title: dataTitle }) => (
        <StyledSlide key={id}>
          <Link to={`${routerPath}/${id}`}>
            <StyledThumb>
              <img src={imageUrl} alt="" />
            </StyledThumb>

            <p className="title">{dataTitle}</p>
          </Link>
        </StyledSlide>
      ))}
    </Slider>
    <div className="mt-5 text-right">
      <StyledButtonRouter $style="border" to={routerPath}>
        View more <RiMoreLine />
      </StyledButtonRouter>
    </div>
  </StyledSection>
);

export default SectionCarousel;
