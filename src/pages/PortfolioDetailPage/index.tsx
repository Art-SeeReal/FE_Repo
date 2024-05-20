import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDeletePortfolio, useFetchDetailPortfolio } from '../../hooks/query/usePortfoliosQuery';
import { useDialog } from '../../hooks/customs/useDialogState';

import * as S from '../../components/styles';
import Dialog from '../../components/Dialog';
import Loading from '../../components/Loading';
import PostDetail from '../../components/PostDetail';

const PortfolioDetailPage = () => {
  const params = useParams();
  const postId = Number(params.id);
  const navigate = useNavigate();

  const { data: porfolioDetails } = useFetchDetailPortfolio(postId);
  const { mutate: deletePorfolio } = useDeletePortfolio();

  const goToModifyPage = () => {
    navigate(`/portfolios/modify/${postId}`);
  };

  const { openDialog, closeDialog } = useDialog();

  const deleteContent = () => {
    openDialog(
      <Dialog
        header="알림"
        footer={
          <S.Button
            onClick={() => {
              closeDialog();
              deletePorfolio(postId);
            }}
          >
            확인
          </S.Button>
        }
      >
        삭제하시겠습니까?
      </Dialog>,
    );
  };

  if (!porfolioDetails) {
    return <Loading />;
  }

  return (
    <PostDetail
      type="portfolio"
      data={porfolioDetails}
      onClickDelete={deleteContent}
      onClickModify={goToModifyPage}
      listRoute="/portfolios"
    />
  );
};

export default PortfolioDetailPage;
