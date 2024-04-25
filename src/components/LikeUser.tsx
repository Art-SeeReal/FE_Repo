import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { RiHeartLine, RiHeartFill } from '@remixicon/react';
import { useAddLikeUser, useDeleteLikeUser } from '../hooks/query/useUserQuery';
import { isLoginSelector } from '../recoil/selectors/userSelectors';
import { useDialog } from '../hooks/customs/useDialogState';
import * as S from './styles';
import Dialog from './Dialog';

interface Props {
  userId: string;
  isLike?: boolean;
}

const LikeUser = ({ userId, isLike }: Props) => {
  const navigate = useNavigate();
  const [isAdded, SetIsAdded] = useState(isLike);
  const isLogin = useRecoilValue(isLoginSelector);

  const { mutate: addLikeUser, isSuccess: isAddLikeUserSuccess, isPending: isAddLikeUserPending } = useAddLikeUser();
  const {
    mutate: deleteLikeUser,
    isSuccess: isDeleteLikeUserSuccess,
    isPending: isDeleteLikeUserPending,
  } = useDeleteLikeUser();

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

  const handleToggleLike: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();

    if (!isLogin) {
      showLoginRequired();
      return;
    }

    if (isAdded) {
      deleteLikeUser(userId);
    } else {
      addLikeUser(userId);
    }
  };

  useEffect(() => {
    if (isAddLikeUserPending) return;

    if (isAddLikeUserSuccess) {
      SetIsAdded(true);
    }
  }, [isAddLikeUserPending]);

  useEffect(() => {
    if (isDeleteLikeUserPending) return;

    if (isDeleteLikeUserSuccess) {
      SetIsAdded(false);
    }
  }, [isDeleteLikeUserPending]);

  const getLikeIcon = () => {
    if (isLogin) {
      return isAdded ? RiHeartFill : RiHeartLine;
    }
    return RiHeartLine;
  };

  const LikeIcon = getLikeIcon();

  return <LikeIcon onClick={handleToggleLike} />;
};

LikeUser.defaultProps = {
  isLike: false,
};

export default LikeUser;
