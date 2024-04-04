import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { RiStarFill, RiStarLine, RiHeartLine, RiHeartFill } from '@remixicon/react';
import {
  useAddPortfolioScrap,
  useDeletePortfolio,
  useDeletePortfolioScrap,
  useFetchDetailPortfolio,
} from '../../hooks/query/usePortfoliosQuery';
import { useDialog } from '../../hooks/customs/useDialogState';
import Dialog from '../../components/Dialog';
import * as S from '../../components/styles';
import { isLoginSelector } from '../../recoil/selectors/userSelectors';
import { useToast } from '../../hooks/customs/useToastState';
import { useAddLikeUser, useDeleteLikeUser, useFetchLikeUser, useFetchUserInfo } from '../../hooks/query/useUserQuery';
import { GetUserResponse } from '../../model/user';

const PortfolioDetailPage = () => {
  const [userInfo, setUserInfo] = useState<GetUserResponse>({
    name: '',
    nickname: '',
    userId: '',
    email: '',
    phone: '',
    regions: [],
    isPrivateEmail: false,
    isPrivatePhone: false,
    userType: '',
  });
  const params = useParams();
  const postId = Number(params.id);
  const isLogin = useRecoilValue(isLoginSelector);
  const navigate = useNavigate();
  const { data: porfolioDetails } = useFetchDetailPortfolio(postId);
  const { mutate: deletePorfolio } = useDeletePortfolio();
  const { mutate: addScrap } = useAddPortfolioScrap();
  const { mutate: deleteScrap } = useDeletePortfolioScrap();
  const { data: likeUser } = useFetchLikeUser();
  const { mutate: addLikeUser } = useAddLikeUser();
  const { mutate: deleteLikeUser } = useDeleteLikeUser();
  const { data: userInfoData } = useFetchUserInfo();

  const goToModifyPage = () => {
    navigate(`/porfolios/modify/${postId}`);
  };

  const { openDialog, closeDialog } = useDialog();
  const { appendToast } = useToast();

  const handleAddScrap: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    addScrap(postId);
    appendToast({ content: '스크랩 성공', type: 'success' });
  };

  const handleDeleteScrap: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    deleteScrap(postId);
    appendToast({ content: '스크랩 취소', type: 'success' });
  };

  const goToLoginPage = () => {
    closeDialog();
    navigate('/login');
  };

  const handleAddLikeUser: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    addLikeUser(userInfo.userId);
    appendToast({ content: '좋아요 성공', type: 'success' });
  };

  const handleDeleteLikeUser: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    deleteLikeUser(userInfo.userId);
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

  const deleteContent = () => {
    openDialog(
      <Dialog header="알림" footer={<S.Button onClick={closeDialog}>확인</S.Button>}>
        삭제하시겠습니까?
      </Dialog>,
    );
    deletePorfolio(Number(postId));
  };

  useEffect(() => {
    if (userInfoData) {
      setUserInfo(userInfoData);
    }
  }, [userInfoData]);

  return (
    <S.Container $width={800}>
      <S.Row>
        <S.Title>{porfolioDetails?.artist}</S.Title>
        {isLogin &&
          (likeUser?.results.some((user) => user.userId === porfolioDetails?.id) ? (
            <RiHeartFill color="red" onClick={handleDeleteLikeUser} />
          ) : (
            <RiHeartLine color="red" onClick={handleAddLikeUser} />
          ))}
        {!isLogin && <RiHeartLine color="red" onClick={handleOpenDialog} />}
      </S.Row>
      <S.Title>{porfolioDetails?.title}</S.Title>
      <S.Row className="my-5">
        <S.Col>{porfolioDetails?.RegDate}</S.Col>
        <S.Col>{porfolioDetails?.fields.label}</S.Col>
        <S.Col>
          {isLogin &&
            (porfolioDetails?.isScrap ? (
              <RiStarFill color="yellow" onClick={handleDeleteScrap} />
            ) : (
              <RiStarLine color="yellow" onClick={handleAddScrap} />
            ))}
          {!isLogin && <RiStarLine color="yellow" onClick={handleOpenDialog} />}
        </S.Col>
        <S.Col>{porfolioDetails?.view}</S.Col>
      </S.Row>
      <S.Row className="my-5">
        <p dangerouslySetInnerHTML={{ __html: porfolioDetails?.content ?? '' }} />
      </S.Row>
      <S.Row className="my-5" $justifyContent="space-between">
        <S.Button onClick={deleteContent}>삭제하기</S.Button>
        <S.Button onClick={goToModifyPage}>수정하기</S.Button>
      </S.Row>
    </S.Container>
  );
};

export default PortfolioDetailPage;
