import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDeleteRecruits, useFetchDetailRecruits } from '../../hooks/query/useRecruitsQuery';
import { useDialog } from '../../hooks/customs/useDialogState';

import * as S from '../../components/styles';
import Dialog from '../../components/Dialog';
import Loading from '../../components/Loading';
import PostDetail from '../../components/PostDetail';

const DetailRecruitsPage = () => {
  const params = useParams();
  const postId = Number(params.id);
  const navigate = useNavigate();
  const { data: recruitsDetails } = useFetchDetailRecruits(postId);
  const { mutate: deleteRecruits } = useDeleteRecruits();

  const goToModifyPage = () => {
    navigate(`/recruits/modify/${postId}`);
  };

  const { openDialog, closeDialog } = useDialog();

  const deleteContent = () => {
    openDialog(
      <Dialog header="알림" footer={<S.Button onClick={closeDialog}>확인</S.Button>}>
        삭제하시겠습니까?
      </Dialog>,
    );
    deleteRecruits(Number(postId));
  };

  if (!recruitsDetails) {
    return <Loading />;
  }

  return (
    <PostDetail
      type="recruit"
      data={recruitsDetails}
      onClickDelete={deleteContent}
      onClickModify={goToModifyPage}
      listRoute="/recruits"
    />
  );
};

export default DetailRecruitsPage;
