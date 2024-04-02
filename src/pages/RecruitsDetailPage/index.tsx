import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { RiStarFill, RiStarLine, RiHeartLine, RiHeartFill } from '@remixicon/react';
import { useAddRecruitsScrap, useDeleteRecruits, useDeleteRecruitsScrap } from '../../hooks/query/useRecruitsQuery';
import { useFetchDetailRecruits } from '../../hooks/query/useRecruitsQuery';
import { useDialog } from '../../hooks/customs/useDialogState';
import Dialog from '../../components/Dialog';
import * as S from '../../components/styles';
import { isLoginSelector } from '../../recoil/selectors/userSelectors';
import { useToast } from '../../hooks/customs/useToastState';
import { useAddLikeUser, useDeleteLikeUser, useFetchLikeUser } from '../../hooks/query/useUserQuery';

const DetailRecruitsPage = () => {
  const params = useParams();
  const postId = Number(params.id);
  const isLoggedIn = useRecoilValue(isLoginSelector);
  const navigate = useNavigate();
  const { data: likeUser } = useFetchLikeUser();
  const { data: recruitsDetails } = useFetchDetailRecruits(postId);
  const { mutate: deleteRecruits } = useDeleteRecruits();
  const { mutate: addScrap } = useAddRecruitsScrap();
  const { mutate: deleteScrap } = useDeleteRecruitsScrap();
  const { mutate: addLikeUser } = useAddLikeUser();
  const { mutate: deleteLikeUser } = useDeleteLikeUser();

  const goToModifyPage = () => {
    navigate(`/recruits/update/${postId}`);
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
    addLikeUser(postId);
    appendToast({ content: '좋아요 성공', type: 'success' });
  };

  const handleDeleteLikeUser: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    deleteLikeUser(postId);
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
    deleteRecruits(Number(postId));
  };

  return (
    <S.Container $width={800}>
      <S.Row>
        <S.Title>{recruitsDetails?.name}</S.Title>
        {isLoggedIn &&
          (likeUser?.results.some((user) => user.userId === recruitsDetails?.id) ? (
            <RiHeartFill color="red" onClick={handleDeleteLikeUser} />
          ) : (
            <RiHeartLine color="red" onClick={handleAddLikeUser} />
          ))}
        {!isLoggedIn && <RiHeartLine color="red" onClick={handleOpenDialog} />}
      </S.Row>
      <S.Row className="my-5" $justifyContent="space-between">
        <S.Title>{recruitsDetails?.title}</S.Title>
        <S.Button $size="small" onClick={goToModifyPage}>
          지원하기
        </S.Button>
      </S.Row>
      <S.Row className="my-5">
        <S.Col>{recruitsDetails?.RegDate}</S.Col>
        <S.Col>{recruitsDetails?.areas.label}</S.Col>
        <S.Col>{recruitsDetails?.fields.label}</S.Col>
        <S.Col>
          {isLoggedIn &&
            (recruitsDetails?.isScrap ? (
              <RiStarFill color="yellow" onClick={handleDeleteScrap} />
            ) : (
              <RiStarLine color="yellow" onClick={handleAddScrap} />
            ))}
          {!isLoggedIn && <RiStarLine color="yellow" onClick={handleOpenDialog} />}
        </S.Col>
        <S.Col>{recruitsDetails?.view}</S.Col>
      </S.Row>
      <S.Row className="my-5">
        <p dangerouslySetInnerHTML={{ __html: recruitsDetails?.content ?? '' }} />
      </S.Row>
      <S.Row className="my-5" $justifyContent="space-between">
        <S.Button onClick={deleteContent}>삭제하기</S.Button>
        <S.Button onClick={goToModifyPage}>수정하기</S.Button>
      </S.Row>
    </S.Container>
  );
};

export default DetailRecruitsPage;
