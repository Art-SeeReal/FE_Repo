import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { RiCloseLine } from '@remixicon/react';
import * as S from './styles';
import { useDialog } from '../hooks/customs/useDialogState';

interface Props {
  header?: string;
  footer?: ReactElement;
  children: ReactNode;
  width?: number;
}

const StyledDialog = styled.div<{ $width?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: var(--spacing);

  .inner {
    width: 100%;
    max-width: 360px;
    border-radius: 1.6rem;
    box-shadow: 0.6rem 0.6rem 1rem rgba(0, 0, 0, 0.2);
    background-color: #fff;

    ${({ $width }) => $width && `max-width: ${$width}px`};
  }

  .header {
    padding: 2rem;
    font-size: var(--sub-title-3);
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding: 2rem;
  }

  .content {
    padding: 2rem;
    max-height: 80vh;
    overflow-y: auto;
  }
`;

const StyledCloseButton = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 2rem;
  cursor: pointer;
`;

const Dialog = ({ header, footer, children, width }: Props) => {
  const { closeDialog } = useDialog();
  return (
    <StyledDialog $width={width}>
      <div className="inner">
        <S.Row $justifyContent="space-between">
          {header && <footer className="header">{header}</footer>}
          <StyledCloseButton onClick={closeDialog}>
            <RiCloseLine />
          </StyledCloseButton>
        </S.Row>
        <article className="content">{children}</article>
        {footer && <footer className="footer">{footer}</footer>}
      </div>
    </StyledDialog>
  );
};

export default Dialog;
