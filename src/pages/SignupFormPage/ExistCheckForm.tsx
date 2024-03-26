import React, { ReactNode, useEffect } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import * as S from '../../components/styles';
import { useToast } from '../../hooks/customs/useToastState';
import { GetExistReponse } from '../../model/user';

interface Props {
  children: ReactNode;
  fetchQuery: UseQueryResult<GetExistReponse>;
  label: string;
  name: string;
  disabled?: boolean;
  onSuccess: (name: string, value: string) => void;
}

const ExistCheckForm = ({ children, fetchQuery, label, name, disabled, onSuccess }: Props) => {
  const { refetch, data, fetchStatus } = fetchQuery;

  const { appendToast } = useToast();

  const handleExistCheck = () => {
    refetch();
  };

  useEffect(() => {
    if (!data || fetchStatus !== 'idle') return;

    if (data.available) {
      appendToast({ type: 'success', content: `시용 할 수 있는 ${label}입니다.` });
    } else {
      appendToast({ type: 'error', content: `이미 사용 중인 ${label}입니다.` });
    }

    onSuccess(name, data.available ? '1' : '');
  }, [data, fetchStatus]);

  return (
    <S.Row $gap={10}>
      <S.Col>{children}</S.Col>
      <S.Col $col={3}>
        <S.Button onClick={handleExistCheck} $style="secondary" $block disabled={disabled}>
          중복확인
        </S.Button>
      </S.Col>
    </S.Row>
  );
};

ExistCheckForm.defaultProps = {
  disabled: false,
};

export default ExistCheckForm;
