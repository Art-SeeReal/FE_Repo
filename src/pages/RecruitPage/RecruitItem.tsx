import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ScrapPost from '../../components/ScrapPost';
import { RecruitsTypes } from '../../model/recruits';

export interface RecruitsProps {
  data: RecruitsTypes;
}

const StyledRecruitItem = styled.div`
  width: calc((100% / 3) - (((3 - 1) / 3) * 4rem));
  padding: 3rem;
  overflow: hidden;
  border-radius: 2rem;
  border: 1px solid var(--color-border-3);
  box-shadow: 0 0.4rem 1.6rem 0 rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition:
    box-shadow 0.25s ease-in-out,
    transform 0.25s ease-in-out;

  &:hover {
    transform: translateY(-0.6rem);
    box-shadow: 0 1.2rem 2rem 0 rgba(0, 0, 0, 0.08);
  }

  .title-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 2rem;
  }

  .title {
    font-size: var(--sub-title-3);
  }

  .writer-info {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
    gap: 0.6rem;
  }

  .recruit-info {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-secondary);
    font-size: var(--text-body-2);
    padding: 0.4rem;

    dd {
      position: relative;
      padding: 0 1.5em;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0.75em;
        bottom: 0;
        margin: auto 0;
        display: inline-block;
        width: 1px;
        height: 50%;
        background-color: var(--color-border-2);
      }

      &:nth-child(2) {
        padding: 0;

        &::before {
          display: none;
        }
      }
    }
  }
`;

const RecruitsImagesComponent = ({ data }: RecruitsProps) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/recruits/${data.id}`);
  };

  return (
    <StyledRecruitItem onClick={handleImageClick}>
      <div className="title-wrap">
        <h2 className="title">{data.title}</h2>
        <ScrapPost type="recruit" postId={data.id} isScrap={data.isScrap} />
      </div>
      <div className="writer-info">{data.nickname}</div>
      <dl className="recruit-info">
        <dt className="hidden">분야</dt>
        <dd>{data.fields?.label}</dd>
        <dt className="hidden">지역</dt>
        <dd>{data.regions?.label}</dd>
      </dl>
    </StyledRecruitItem>
  );
};

export default RecruitsImagesComponent;
