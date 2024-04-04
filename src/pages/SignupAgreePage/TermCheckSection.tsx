import React, { ReactNode } from 'react';
import * as S from '../../components/styles';

interface Props {
  content: ReactNode;
  children: ReactNode;
}

const TermCheckSection = ({ content, children }: Props) => {
  return (
    <div className="py-4">
      <S.ScrollableContainer>{content}</S.ScrollableContainer>
      <S.Row $justifyContent="flex-end">{children}</S.Row>
    </div>
  );
};

export default TermCheckSection;
