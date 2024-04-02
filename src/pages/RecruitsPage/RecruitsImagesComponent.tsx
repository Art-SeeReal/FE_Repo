import React from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiEyeLine, RiStarFill, RiStarLine, RiHeartLine, RiHeartFill } from '@remixicon/react';
import * as S from '../../components/styles';
import { isLoginSelector } from '../../recoil/selectors/userSelectors';
import { useDialog } from '../../hooks/customs/useDialogState';
import Dialog from '../../components/Dialog';
import { useAddRecruitsScrap, useDeleteRecruitsScrap } from '../../hooks/query/useRecruitsQuery';
import { useToast } from '../../hooks/customs/useToastState';
import { useAddLikeUser, useDeleteLikeUser, useFetchLikeUser } from '../../hooks/query/useUserQuery';

const ImageContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 30px;
  margin: 10px;
  width: 400px;
  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* 호버할 때 그림자 추가 */
  }
`;

export interface RecruitsProps {
  recruitsProps: {
    id: number;
    name: string;
    title: string;
    areas: {
      code: string;
      label: string;
    };
    fields: {
      code: string;
      label: string;
    };
    isScrap: boolean;
    view: number;
    RegDate: string;
    content: string;
  };
}

const RecruitsImagesComponent = ({ recruitsProps }: RecruitsProps) => {
  const navigate = useNavigate();
  const { mutate: addScrap } = useAddRecruitsScrap();
  const { mutate: deleteScrap } = useDeleteRecruitsScrap();
  const { data: likeUser } = useFetchLikeUser();
  const { mutate: addLikeUser } = useAddLikeUser();
  const { mutate: deleteLikeUser } = useDeleteLikeUser();
  const isLoggedIn = useRecoilValue(isLoginSelector);

  const handleImageClick = () => {
    navigate(`/recruits/${recruitsProps.id}`);
  };

  const { openDialog, closeDialog } = useDialog();
  const { appendToast } = useToast();

  const goToLoginPage = () => {
    closeDialog();
    navigate('/login');
  };

  const handleAddScrap: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    addScrap(recruitsProps.id);
    appendToast({ content: '스크랩 성공', type: 'success' });
  };

  const handleDeleteScrap: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    deleteScrap(recruitsProps.id);
    appendToast({ content: '스크랩 취소', type: 'success' });
  };

  const handleAddLikeUser: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    addLikeUser(recruitsProps.id);
    appendToast({ content: '좋아요 성공', type: 'success' });
  };

  const handleDeleteLikeUser: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    deleteLikeUser(recruitsProps.id);
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
    <ImageContainer onClick={handleImageClick}>
      <S.Row className="my-4" $justifyContent="space-between">
        <S.Row>
          {recruitsProps.name}
          {isLoggedIn &&
            (likeUser?.results.some((user) => user.userId === recruitsProps?.id) ? (
              <RiHeartFill color="red" onClick={handleDeleteLikeUser} />
            ) : (
              <RiHeartLine color="red" onClick={handleAddLikeUser} />
            ))}
          {!isLoggedIn && <RiHeartLine color="red" onClick={handleOpenDialog} />}
        </S.Row>
        <S.Row>
          <RiEyeLine /> {recruitsProps?.view}
          {isLoggedIn &&
            (recruitsProps.isScrap ? (
              <RiStarFill color="yellow" onClick={handleDeleteScrap} />
            ) : (
              <RiStarLine color="yellow" onClick={handleAddScrap} />
            ))}
          {!isLoggedIn && <RiStarLine color="yellow" onClick={handleOpenDialog} />}
        </S.Row>
      </S.Row>
      <S.Title className="my-5">{recruitsProps.title}</S.Title>
      <S.Row className="my-4">
        지역: {recruitsProps.areas?.label} | 분야: {recruitsProps.fields?.label}
      </S.Row>
    </ImageContainer>
  );
};

export default RecruitsImagesComponent;
