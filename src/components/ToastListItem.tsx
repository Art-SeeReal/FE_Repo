import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiInformationFill, RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { slideUpAndFadeOut, slideUpAndFadeIn } from './styles/animations';
import { Toast, ToastTypes } from '../recoil/atoms/toastState';

const StyledToastItem = styled.li<{ $isClosing: boolean; $type?: string }>`
  width: 100%;
  display: flex;
  gap: 1em;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 0 0.8rem 0.8rem 0;
  border-left: 0.6rem solid;
  background-color: #fff;
  box-shadow: 0 0 1rem 0.6rem rgba(0, 0, 0, 0.1);
  font-size: var(--text-body-1);
  animation: ${({ $isClosing }) => ($isClosing ? slideUpAndFadeOut : slideUpAndFadeIn)} 0.3s linear forwards;

  ${({ $type }) => {
    if ($type === ToastTypes.info) return `border-color: var(--color-info);`;
    if ($type === ToastTypes.success) return `border-color: var(--color-success);`;
    if ($type === ToastTypes.error) return `border-color: var(--color-error);`;

    return null;
  }}

  .title {
    margin-bottom: 0.4rem;
    font-weight: 700;
    text-transform: capitalize;
  }

  .message {
    font-size: var(--text-body-2);
  }
`;

const ToastListItem = ({ type, content, duration }: Toast) => {
  console.log(`type: ${type}`);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsClosing(true);
      clearTimeout(time);
    }, duration);

    return () => clearTimeout(time);
  }, []);

  return (
    <StyledToastItem $isClosing={isClosing} $type={type}>
      {type === ToastTypes.info && <RiInformationFill className="color-info" />}
      {type === ToastTypes.success && <RiCheckboxCircleFill className="color-success" />}
      {type === ToastTypes.error && <RiErrorWarningFill className="color-error" />}

      <div>
        <h1 className="title">{type}</h1>
        <p className="message">{content}</p>
      </div>
    </StyledToastItem>
  );
};

ToastListItem.defaultProps = {
  duration: 3000,
  type: ToastTypes.info,
};

export default ToastListItem;
