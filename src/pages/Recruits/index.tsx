import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import HeaderContainer from './HeaderContainer';
import { recruitsDataSelector } from '../../recoil/selectors/recruitBoardSelectors';
import { useFetchRecruits } from '../../hooks/useRecruitsQuery';
import RecruitsImagesComponent from './RecruitsImagesComponent';

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Recruits = () => {
  const ITEMS_PER_PAGE = 12;
  const recruitsData = useRecoilValue(recruitsDataSelector);
  const { isLoading, isError } = useFetchRecruits();
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    console.log(recruitsData);
  }, [recruitsData]);

  return (
    <>
      <HeaderContainer />
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <>
          <ImageContainer>
            {recruitsData
              ?.slice(startIndex, endIndex)
              .map((data) => <RecruitsImagesComponent key={data.id} data={data} />)}
          </ImageContainer>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Pagination
              count={Math.ceil((recruitsData?.length ?? 0) / ITEMS_PER_PAGE)}
              page={page}
              onChange={handleChangePage}
              color="secondary"
              size="large"
            />
          </Stack>
        </>
      )}
      {isError && <div>에러</div>}
    </>
  );
};

export default Recruits;
