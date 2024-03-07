import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toastState } from '../recoil/atoms/toastState';
import ToastListItem from './ToastListItem';

const StyledToastList = styled.ul`
  position: fixed;
  z-index: 2500;
  max-width: 400px;
  top: 2rem;
  right: 2rem;
  left: 2rem;
  margin: 0 auto;
`;

const ToastList = () => {
  const toasts = useRecoilValue(toastState);

  return (
    <StyledToastList>
      {toasts.map(({ id, ...rest }) => (
        <ToastListItem key={id} {...rest} />
      ))}
    </StyledToastList>
  );
};

export default ToastList;
