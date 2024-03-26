import React, { ReactElement, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../recoil/atoms/dialogState';
import * as S from '../../components/styles';

export const useDialog = () => {
  const [dialog, setDialog] = useRecoilState(dialogState);

  const openDialog = (element: ReactElement) => setDialog(element);
  const closeDialog = () => setDialog(null);

  return {
    dialog,
    openDialog,
    closeDialog,
  };
};

export const DialogContainer = () => {
  const { dialog, closeDialog } = useDialog();

  if (!dialog) return null;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.parentElement === e.currentTarget) {
      closeDialog();
    }
  };

  return <S.Backdrop onClick={handleClick}>{dialog}</S.Backdrop>;
};
