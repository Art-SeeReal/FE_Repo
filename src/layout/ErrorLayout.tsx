import React from 'react';
import * as S from '../components/styles';
import LayoutWrapper from './LayoutWrapper';
import ErrorCode from '../components/ErrorCode';

interface Props {
  errorCode: number;
}

const ErrorLayout = ({ errorCode = 404 }: Props) => {
  return (
    <LayoutWrapper>
      <S.Container $width={800} $paddingTop $paddingBottom className="text-center">
        <S.Row $justifyContent="center" className="mb-4">
          <ErrorCode status={errorCode} />
        </S.Row>
        {errorCode === 401 && (
          <>
            <S.Title as="p">로그인이 필요한 서비스입니다.</S.Title>
            <S.ButtonRouter to="/login">로그인 페이지로</S.ButtonRouter>
          </>
        )}
        {errorCode === 404 && (
          <>
            <S.Title as="p">찾을 수 없는 페이지입니다.</S.Title>
            <S.ButtonRouter to="/">메인 페이지로</S.ButtonRouter>
          </>
        )}
      </S.Container>
    </LayoutWrapper>
  );
};

export default ErrorLayout;
