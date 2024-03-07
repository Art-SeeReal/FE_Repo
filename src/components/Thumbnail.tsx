import React from 'react';
import styled from 'styled-components';
import { RiImage2Line } from '@remixicon/react';

const StyledThumbnail = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 20rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-border-2);
  background: #fff;
  cursor: pointer;
  overflow: hidden;

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
  imageUrl?: string;
  onClick?: () => void;
}

const Thumbnail = ({ imageUrl, onClick }: Props) => {
  return (
    <StyledThumbnail onClick={onClick}>
      <RiImage2Line color="#ccc" size="4rem" />
      {imageUrl && <img src={imageUrl} alt="" />}
    </StyledThumbnail>
  );
};

export default Thumbnail;
