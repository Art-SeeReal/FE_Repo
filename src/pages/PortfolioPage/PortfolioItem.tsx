import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiBookmarkFill, RiBookmarkLine, RiHeartLine, RiHeartFill } from '@remixicon/react';
import { useRecoilValue } from 'recoil';

import * as S from '../../components/styles';
import Dialog from '../../components/Dialog';
import PostThumbnail from '../../components/PostThumbnail';

import { isLoginSelector } from '../../recoil/selectors/userSelectors';
import { useAddRecruitsScrap, useDeleteRecruitsScrap } from '../../hooks/query/useRecruitsQuery';
import { useDialog } from '../../hooks/customs/useDialogState';
import { useToast } from '../../hooks/customs/useToastState';
import { useAddLikeUser, useDeleteLikeUser, useFetchLikeUser } from '../../hooks/query/useUserQuery';
import { GetUserResponse } from '../../model/user';

import { GetDetailPortfoliosResponse } from '../../model/portfolios';

interface Props {
  data: GetDetailPortfoliosResponse;
  userInfo: GetUserResponse;
}

const StyledPortfolioItem = styled.div`
  position: relative;
  width: calc((100% / 3) - (((3 - 1) / 3) * 4rem));
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-0.6rem);

    .details {
      background-color: rgba(0, 0, 0, 0.2);
    }

    .title {
      text-decoration: underline;
    }
  }

  .details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    .writer-info {
      display: flex;
      gap: 0.6rem;
      justify-content: flex-end;
    }

    .title-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        margin-top: 0.4rem;
        flex: 0 0 80%;
      }
    }
  }
`;

const PortfolioItem = ({ data, userInfo }: Props) => {
  const isLogin = useRecoilValue(isLoginSelector);
  const navigate = useNavigate();
  const { mutate: addScrap } = useAddRecruitsScrap();
  const { mutate: deleteScrap } = useDeleteRecruitsScrap();
  const { data: likeUser } = useFetchLikeUser();
  const { mutate: addLikeUser } = useAddLikeUser();
  const { mutate: deleteLikeUser } = useDeleteLikeUser();

  const { openDialog, closeDialog } = useDialog();
  const { appendToast } = useToast();

  const goToPortfolioDetail = () => {
    navigate(`/portfolios/${data.id}`);
  };

  const handleAddScrap: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    addScrap(data.id);
    appendToast({ content: '스크랩 성공', type: 'success' });
  };

  const handleDeleteScrap: React.MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    deleteScrap(data.id);
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

  return (
    <StyledPortfolioItem onClick={goToPortfolioDetail}>
      <PostThumbnail>
        <img src={data?.imageUrl} alt={data?.title} />

        <div className="details">
          <div className="writer-info">
            <p>{data.artist}</p>
            {isLogin &&
              (likeUser?.results.some((user) => user.userId === data?.id) ? (
                <RiHeartFill onClick={handleDeleteLikeUser} />
              ) : (
                <RiHeartLine onClick={handleAddLikeUser} />
              ))}
            {!isLogin && <RiHeartLine onClick={handleOpenDialog} />}
          </div>

          <div className="mt-auto">
            <S.Description $size="small">{data?.fields.label}</S.Description>

            <div className="title-wrap">
              <S.EllipsisText className="title">{data?.title}</S.EllipsisText>

              {isLogin &&
                (data?.isScrap ? (
                  <RiBookmarkFill onClick={handleDeleteScrap} />
                ) : (
                  <RiBookmarkLine onClick={handleAddScrap} />
                ))}

              {!isLogin && <RiBookmarkLine onClick={handleOpenDialog} />}
            </div>
          </div>
        </div>
      </PostThumbnail>
    </StyledPortfolioItem>
  );
};

export default PortfolioItem;
