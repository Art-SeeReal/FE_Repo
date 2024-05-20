import React, { ReactNode } from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import styled from 'styled-components';
import SliderNavButton from './SliderNavButton';
import { generateStr } from '../utils/utils';

SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

interface SwiperOptions {
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: { delay?: number; disableOnInteraction?: boolean; pauseOnMouseEnter?: boolean } | boolean;
  loop?: boolean;
  loopedSlides?: number;
  speed?: number;
  navigation?: { prevEl: string; nextEl: string } | boolean;
  pagination?: { el: string; type?: 'bullets'; clickable?: boolean } | boolean;
  effect?: 'slide' | 'fade';
  breakpoints?: {
    [breakpoint: number]: {
      slidesPerView?: number;
      spaceBetween?: number;
    };
  };
  onSlideChange?: () => void;
}

interface Props {
  options?: SwiperOptions;
  linear?: boolean;
  children: ReactNode;
}

const StyledSlider = styled.div`
  position: relative;

  &.linear {
    .swiper-wrapper {
      transition-timing-function: linear;
    }
  }

  .slider-nav {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &.is-prev {
      left: 0;
    }

    &.is-next {
      right: 0;
    }
  }

  .slider-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;

    .swiper-pagination-bullet {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.4);
      transition: background-color 0.4s ease;
      cursor: pointer;

      &-active {
        background-color: rgba(0, 0, 0, 1);
      }
    }
  }
`;

const Slider = ({ options, linear, children }: Props) => {
  const uniqueClassName = `slider-${generateStr(5)}`;

  let classNames = `${uniqueClassName}`;

  if (linear) {
    classNames += ` linear`;
  }

  const defaultOptions: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
    loop: true,
    speed: 500,
    effect: 'slide',
    ...options,
    ...(options?.navigation === true && {
      navigation: {
        prevEl: `.${uniqueClassName} .slider-nav.is-prev`,
        nextEl: `.${uniqueClassName} .slider-nav.is-next`,
      },
    }),
    ...(options?.pagination === true && {
      pagination: { el: `.${uniqueClassName} .slider-pagination`, clickable: true },
    }),
  };

  return (
    <StyledSlider className={classNames}>
      <Swiper {...defaultOptions}>
        {React.Children.map(children, (child: ReactNode) => {
          return <SwiperSlide>{child}</SwiperSlide>;
        })}
      </Swiper>
      {!!defaultOptions?.navigation && (
        <>
          <SliderNavButton className="slider-nav is-prev" direction="prev" />
          <SliderNavButton className="slider-nav is-next" direction="next" />
        </>
      )}
      {!!defaultOptions?.pagination && <div className="slider-pagination" />}
    </StyledSlider>
  );
};

export default Slider;
