import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiEyeLine, RiStarFill, RiStarLine, RiHeartLine, RiHeartFill } from '@remixicon/react';
import { useRecoilValue } from 'recoil';
import * as S from '../../components/styles';
import { useAddRecruitsScrap, useDeleteRecruitsScrap } from '../../hooks/query/useRecruitsQuery';
import { isLoginSelector } from '../../recoil/selectors/userSelectors';
import { useDialog } from '../../hooks/customs/useDialogState';
import { useToast } from '../../hooks/customs/useToastState';
import Dialog from '../../components/Dialog';
import { useAddLikeUser, useDeleteLikeUser, useFetchLikeUser } from '../../hooks/query/useUserQuery';

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  padding-bottom: 100%;
  cursor: pointer;

  &:hover {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    filter: brightness(80%);
  }
`;

const Image = styled.img<{ id: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const ArtistInfo = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  z-index: 2;
`;

const LikeAndView = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  color: white;
  z-index: 2;

  & > * {
    margin-right: 2px;
  }

  @media (max-width: 560px) {
    display: none;
  }
`;

const Title = styled.div<{ isVisible: boolean }>`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 40px;
  font-weight: bold;
  color: white;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @media (max-width: 1200px) {
    font-size: 36px;
  }

  @media (max-width: 960px) {
    font-size: 30px;
  }

  @media (max-width: 760px) {
    font-size: 18px;
  }

  @media (max-width: 560px) {
    font-size: 14px;
  }
`;

const LocationAndField = styled.div<{ isVisible: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 16px;
  color: white;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @media (max-width: 760px) {
    font-size: 14px;
  }

  @media (max-width: 560px) {
    font-size: 12px;
    text-align: center;
  }
`;

export interface PortfolioProps {
  portfolioProps: {
    id: number;
    imageUrl: string;
    title: string;
    artist: string;
    fields: {
      code: string;
      label: string;
    };
    isScrap: boolean;
    like: number;
    view: number;
    RegDate: string;
  };
}

const PortfolioImagesComponent = ({ portfolioProps }: PortfolioProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLoggedIn = useRecoilValue(isLoginSelector);
  const navigate = useNavigate();
  const { mutate: addScrap } = useAddRecruitsScrap();
  const { mutate: deleteScrap } = useDeleteRecruitsScrap();
  const { data: likeUser } = useFetchLikeUser();
  const { mutate: addLikeUser } = useAddLikeUser();
  const { mutate: deleteLikeUser } = useDeleteLikeUser();

  const handleImageClick = () => {
    navigate(`/portfolios/${portfolioProps.id}`);
  };

  const { openDialog, closeDialog } = useDialog();
  const { appendToast } = useToast();

  const handleAddScrap: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    addScrap(portfolioProps.id);
    appendToast({ content: '스크랩 성공', type: 'success' });
  };

  const handleDeleteScrap: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    deleteScrap(portfolioProps.id);
    appendToast({ content: '스크랩 취소', type: 'success' });
  };

  const goToLoginPage = () => {
    closeDialog();
    navigate('/login');
  };

  const handleAddLikeUser: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    addLikeUser(portfolioProps.id);
    appendToast({ content: '좋아요 성공', type: 'success' });
  };

  const handleDeleteLikeUser: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    deleteLikeUser(portfolioProps.id);
    appendToast({ content: '좋아요 취소', type: 'success' });
  };

  const handleOpenDialog: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    openDialog(
      <Dialog
        header="알림"
        footer={
          <>
            <S.Button onClick={goToLoginPage}>이동</S.Button>
            <S.Button onClick={closeDialog}>닫기</S.Button>
          </>
        }
      >
        로그인이 필요한 서비스입니다.
      </Dialog>,
    );
  };

  return (
    <S.Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <ImageContainer onClick={handleImageClick}>
        <Image id={portfolioProps?.id} src={portfolioProps?.imageUrl} alt={portfolioProps?.title} />
        <ArtistInfo style={{ opacity: isHovered ? 1 : 0 }}>
          <S.Row>
            <S.Title>{portfolioProps.artist}</S.Title>
            {isLoggedIn &&
              (likeUser?.results.some((user) => user.userId === portfolioProps?.id) ? (
                <RiHeartFill color="red" onClick={handleDeleteLikeUser} />
              ) : (
                <RiHeartLine color="red" onClick={handleAddLikeUser} />
              ))}
            {!isLoggedIn && <RiHeartLine color="red" onClick={handleOpenDialog} />}
          </S.Row>
        </ArtistInfo>
        <LikeAndView style={{ opacity: isHovered ? 1 : 0 }}>
          <RiEyeLine /> {portfolioProps?.view}
          {isLoggedIn &&
            (portfolioProps?.isScrap ? (
              <RiStarFill color="yellow" onClick={handleDeleteScrap} />
            ) : (
              <RiStarLine color="yellow" onClick={handleAddScrap} />
            ))}
          {!isLoggedIn && <RiStarLine color="yellow" onClick={handleOpenDialog} />}
        </LikeAndView>
        <Title isVisible={isHovered}>
          {portfolioProps?.title.length > 25 ? `${portfolioProps?.title.slice(0, 22)}...` : portfolioProps?.title}
        </Title>
        <LocationAndField isVisible={isHovered}>{portfolioProps?.fields.label}</LocationAndField>
      </ImageContainer>
    </S.Container>
  );
};

export default PortfolioImagesComponent;
