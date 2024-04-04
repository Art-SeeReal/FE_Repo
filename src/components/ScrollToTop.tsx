import React from 'react';
import styled from 'styled-components';
import { RiArrowUpDoubleFill } from '@remixicon/react';

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 20px;
  z-index: 1000;
  padding: 10px;
  background-color: #e58ae6;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #b249c6;
  }
`;

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <ScrollToTopButton onClick={scrollToTop}>
      <RiArrowUpDoubleFill />
    </ScrollToTopButton>
  );
};

export default ScrollToTop;
