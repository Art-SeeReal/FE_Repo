import React, { ReactNode } from 'react';
import styled from 'styled-components';
import * as S from './styles';

const StyledThumb = styled(S.RoundBox)`
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

interface Props {
  children: ReactNode;
}

const Thumb = ({ children }: Props) => {
  return <StyledThumb>{children}</StyledThumb>;
};

export default Thumb;
