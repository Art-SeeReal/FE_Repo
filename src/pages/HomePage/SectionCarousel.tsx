import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiMoreLine } from '@remixicon/react';
import Slider from '../../components/Slider';
import * as S from '../../components/styles';
import PostThumbnail from '../../components/PostThumbnail';

const StyledSection = styled.section`
  padding: 6rem 0;
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
    <S.Title $size="large">{title}</S.Title>
    <Slider
      options={{
        slidesPerView: 1,
        spaceBetween: 20,
        loopedSlides: data?.count,
        autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
        speed: 4000,
        breakpoints: {
          750: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1080: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
      }}
    >
      {data?.results.map(({ id, imageUrl, title: dataTitle }) => (
        <StyledSlide key={id}>
          <Link to={`${routerPath}/${id}`}>
            <PostThumbnail>
              <img src={imageUrl} alt="" />
            </PostThumbnail>

            <p className="title">{dataTitle}</p>
          </Link>
        </StyledSlide>
      ))}
    </Slider>
    <div className="mt-5 text-right">
      <S.ButtonRouter to={routerPath}>
        View more <RiMoreLine />
      </S.ButtonRouter>
    </div>
  </StyledSection>
);

export default SectionCarousel;
