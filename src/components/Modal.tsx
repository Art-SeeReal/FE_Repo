import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { RiCloseLine } from '@remixicon/react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1%;
  right: 1%;
  background: none;
  border: none;
  cursor: pointer;
`;

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <ModalBackdrop>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <RiCloseLine />
        </CloseButton>
        {children}
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default Modal;
