import React, { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { dialogState } from '../recoil/atoms/dialogState';
import * as S from '../components/styles';

export const useDialog = () => {
  const [dialog, setDialog] = useRecoilState(dialogState);

  const openDialog = (element: ReactElement) => setDialog(element);
  const removeDialog = () => setDialog(null);

  return {
    dialog,
    openDialog,
    removeDialog,
  };
};

export const DialogContainer = () => {
  const { dialog } = useDialog();

  if (!dialog) return null;

  return <S.Backdrop>{dialog}</S.Backdrop>;
};