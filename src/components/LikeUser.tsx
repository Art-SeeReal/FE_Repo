import React, { MouseEventHandler, useEffect, useState } from 'react';
import { RiHeartLine, RiHeartFill } from '@remixicon/react';
import { useAddLikeUser, useDeleteLikeUser } from '../hooks/query/useUserQuery';

interface Props {
  userId: string;
  isLike?: boolean;
}

const LikeUser = ({ userId, isLike }: Props) => {
  const [isAdded, SetIsAdded] = useState(isLike);

  const { mutate: addLikeUser, isSuccess: isAddLikeUserSuccess, isPending: isAddLikeUserPending } = useAddLikeUser();
  const {
    mutate: deleteLikeUser,
    isSuccess: isDeleteLikeUserSuccess,
    isPending: isDeleteLikeUserPending,
  } = useDeleteLikeUser();

  const handleToggleLike: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();

    if (isAdded) {
      deleteLikeUser({ userId });
    } else {
      addLikeUser({ userId });
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

  const LikeIcon = isAdded ? RiHeartFill : RiHeartLine;

  return React.createElement(LikeIcon, { onClick: handleToggleLike });
};

LikeUser.defaultProps = {
  isLike: false,
};

export default LikeUser;
