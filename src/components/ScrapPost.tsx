import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { RiBookmarkLine, RiBookmarkFill } from '@remixicon/react';
import { useAddPortfolioScrap, useDeletePortfolioScrap } from '../hooks/query/usePortfoliosQuery';
import { useAddRecruitsScrap, useDeleteRecruitsScrap } from '../hooks/query/useRecruitsQuery';
import { isLoginSelector } from '../recoil/selectors/userSelectors';
import { useDialog } from '../hooks/customs/useDialogState';
import Dialog from './Dialog';
import * as S from './styles';

const TYPES = {
  portfolio: 'portfolio',
  recruit: 'recruit',
} as const;

interface Props {
  type: keyof typeof TYPES;
  postId: number;
  isScrap?: boolean;
  iconSize?: number | string;
}

const ScrapPost = ({ type, postId, isScrap, iconSize }: Props) => {
  const navigate = useNavigate();
  const [isAdded, SetIsAdded] = useState(isScrap);
  const isLogin = useRecoilValue(isLoginSelector);

  const addScrapQueryFn = type === TYPES.portfolio ? useAddPortfolioScrap : useAddRecruitsScrap;
  const deleteScrapQueryFn = type === TYPES.portfolio ? useDeletePortfolioScrap : useDeleteRecruitsScrap;

  const { mutate: addScrap, isSuccess: isAddScrapSuccess, isPending: isAddScrapPending } = addScrapQueryFn();
  const {
    mutate: deleteScrap,
    isSuccess: isDeleteScrapSuccess,
    isPending: isDeleteScrapPending,
  } = deleteScrapQueryFn();

  const { openDialog, closeDialog } = useDialog();

  const goToLogin = () => {
    navigate('/login');
  };

  const showLoginRequired = () => {
    openDialog(
      <Dialog
        header="알림"
        footer={
          <S.Button
            onClick={() => {
              closeDialog();
              goToLogin();
            }}
          >
            확인
          </S.Button>
        }
      >
        <p>로그인이 필요한 서비스입니다.</p>
        <p>이동하시겠습니까?</p>
      </Dialog>,
    );
  };

  const handleToggleScrap: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();

    if (!isLogin) {
      showLoginRequired();
      return;
    }

    if (isAdded) {
      deleteScrap(postId);
    } else {
      addScrap(postId);
    }
  };

  useEffect(() => {
    if (isAddScrapPending) return;

    if (isAddScrapSuccess) {
      SetIsAdded(true);
    }
  }, [isAddScrapPending]);

  useEffect(() => {
    if (isDeleteScrapPending) return;

    if (isDeleteScrapSuccess) {
      SetIsAdded(false);
    }
  }, [isDeleteScrapPending]);

  const getScrapIcon = () => {
    if (isLogin) {
      return isAdded ? RiBookmarkFill : RiBookmarkLine;
    }
    return RiBookmarkLine;
  };

  const ScrapIcon = getScrapIcon();

  return <ScrapIcon onClick={handleToggleScrap} size={iconSize} />;
};

ScrapPost.defaultProps = {
  isScrap: false,
};

export default ScrapPost;
