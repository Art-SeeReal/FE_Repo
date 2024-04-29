import React from 'react';
import { RiDeleteBin6Line, RiEdit2Line, RiMenu2Line } from '@remixicon/react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import LikeUser from './LikeUser';
import ScrapPost from './ScrapPost';
import { GetDetailPortfoliosResponse } from '../model/portfolios';
import { GetDetailRecruitsResponse } from '../model/recruits';
import { useDialog } from '../hooks/customs/useDialogState';
import Dialog from './Dialog';
import { isLoginSelector } from '../recoil/selectors/userSelectors';

const StyledPostHeader = styled.header`
  margin-bottom: 4rem;
  text-align: center;

  .caption {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-secondary);

    ${S.Description} {
      position: relative;
      padding: 0 1em;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto 0;
        width: 1px;
        height: 50%;
        background-color: var(--color-border-2);
      }

      &:first-child {
        &::before {
          display: none;
        }
      }
    }
  }

  .title-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: var(--title-1);
    font-weight: 700;
  }

  .scrap-button {
    flex: 0 0 10rem;
  }
`;

const StyledPostInfo = styled.dl`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  dt,
  dd {
    flex: 0 0 50%;
    margin: 1rem 0;
  }

  dd {
    display: flex;
    align-items: center;
    font-weight: 700;
  }

  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledPostArticle = styled.article`
  margin: 2rem 0;
  padding: 4rem 0;
  border-top: 1px solid var(--color-border-3);
  border-bottom: 1px solid var(--color-border-3);
`;

const TYPES = {
  portfolio: 'portfolio',
  recruit: 'recruit',
} as const;

interface Props {
  type: keyof typeof TYPES;
  data: GetDetailPortfoliosResponse | GetDetailRecruitsResponse;
  listRoute: string;
  onClickDelete?: () => void;
  onClickModify?: () => void;
  onClickApply?: () => void;
}

const PostDetail = ({ type, data, onClickDelete, onClickModify, onClickApply, listRoute }: Props) => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = useDialog();
  const isLogin = useRecoilValue(isLoginSelector);

  const goToLogin = () => {
    navigate('/login');
  };

  const showLoginRequired = () => {
    openDialog(
      <Dialog
        header="알림"
        footer={
          <S.Button
            onClick={() => {
              closeDialog();
              goToLogin();
            }}
          >
            확인
          </S.Button>
        }
      >
        <p>로그인이 필요한 서비스입니다.</p>
        <p>이동하시겠습니까?</p>
      </Dialog>,
    );
  };
  return (
    <S.Container $width={800}>
      <StyledPostHeader>
        <div className="caption">
          <S.Description>{data?.fields.label}</S.Description>
          {'regions' in data && <S.Description>{data.regions.label}</S.Description>}
        </div>

        <div className="title-wrap">
          <h2 className="title">{data?.title}</h2>
          <S.Button className="scrap-button" $inline $style="link">
            {data?.id && <ScrapPost type={type} postId={data?.id} isScrap={data?.isScrap} iconSize="3.6rem" />}
          </S.Button>
        </div>
      </StyledPostHeader>

      <StyledPostInfo>
        <dt>작성자</dt>
        <dd>
          {data?.nickname}
          <S.Button $size="xsmall" $inline $style="link">
            {data?.userId && <LikeUser userId={data?.userId} />}
          </S.Button>
        </dd>
        <dt>게시일</dt>
        <dd>{data?.RegDate}</dd>
        <dt>조회수</dt>
        <dd>{data?.view}</dd>
      </StyledPostInfo>

      <StyledPostArticle dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />

      {type === TYPES.recruit && (
        <S.Row className="mt-5" $justifyContent="flex-end">
          <S.Button onClick={isLogin ? onClickApply : showLoginRequired}>지원하기</S.Button>
        </S.Row>
      )}

      <S.Row className="mt-5">
        <S.Col $auto>
          {onClickDelete && (
            <S.Button onClick={onClickDelete} $style="link" $inline title="게시글 삭제">
              <RiDeleteBin6Line />
            </S.Button>
          )}
          {onClickModify && (
            <S.Button onClick={onClickModify} $style="link" $inline title="게시글 수정">
              <RiEdit2Line />
            </S.Button>
          )}
        </S.Col>
        <S.Col className="ml-auto" $auto>
          <S.ButtonRouter to={listRoute} $style="link" $inline title="목록">
            <RiMenu2Line />
          </S.ButtonRouter>
        </S.Col>
      </S.Row>
    </S.Container>
  );
};

export default PostDetail;
