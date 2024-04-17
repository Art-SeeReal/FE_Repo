import React, { MouseEventHandler, useEffect, useState } from 'react';
import { RiBookmarkLine, RiBookmarkFill } from '@remixicon/react';
import { useAddPortfolioScrap, useDeletePortfolioScrap } from '../hooks/query/usePortfoliosQuery';
import { useAddRecruitsScrap, useDeleteRecruitsScrap } from '../hooks/query/useRecruitsQuery';

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
  const [isAdded, SetIsAdded] = useState(isScrap);

  const addScrapQueryFn = type === TYPES.portfolio ? useAddPortfolioScrap : useAddRecruitsScrap;
  const deleteScrapQueryFn = type === TYPES.portfolio ? useDeletePortfolioScrap : useDeleteRecruitsScrap;

  const { mutate: addScrap, isSuccess: isAddScrapSuccess, isPending: isAddScrapPending } = addScrapQueryFn();
  const {
    mutate: deleteScrap,
    isSuccess: isDeleteScrapSuccess,
    isPending: isDeleteScrapPending,
  } = deleteScrapQueryFn();

  const handleToggleScrap: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();

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

  const ScrapIcon = isAdded ? RiBookmarkFill : RiBookmarkLine;

  return React.createElement(ScrapIcon, { onClick: handleToggleScrap, size: iconSize });
};

ScrapPost.defaultProps = {
  isScrap: false,
};

export default ScrapPost;
