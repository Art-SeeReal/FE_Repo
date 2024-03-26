import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RiArrowUpDoubleFill } from '@remixicon/react';
import { useInView } from 'react-intersection-observer';
import { useFetchRecruits } from '../../hooks/query/useRecruitsQuery';
import RecruitsImagesComponent from './RecruitsImagesComponent';
import { MultipleDropdownMenu } from '../../hooks/useDropdown';
import * as S from '../../components/styles';
import { useFetchAreas } from '../../hooks/query/useUtilQuery';
import Loading from '../../components/Loading';

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 20px;
  z-index: 1000;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

interface RecruitsPropsTypes {
  id: number;
  name: string;
  title: string;
  location: {
    code: string;
    label: string;
  };
  field: {
    code: string;
    label: string;
  };
  RegDate: string;
  content: string;
}

const Recruits = () => {
  const [page, setPage] = useState(10);
  const { data: recruitsData, refetch, isLoading, isError } = useFetchRecruits({ page });
  const { data: areaData } = useFetchAreas();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 1,
  });
  const initialValue = 'Q000';
  const [selectedAreas, setSelectedAreas] = useState<string[]>([initialValue]);

  const goToRegisterPage = () => {
    navigate('/recruits/register');
  };

  useEffect(() => {
    if (inView && !isLoading) {
      refetch();
      setPage(page + 10);
    }
  }, [inView, isLoading]);

  if (isError) {
    return <div>에러</div>;
  }
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <S.Container>
        <MultipleDropdownMenu
          values={selectedAreas}
          setValues={(values) => setSelectedAreas(values)}
          defaultLabel="지역"
          checkboxGroup={{
            initialValues: [initialValue],
            data: areaData?.results.map(({ code: value, label }) => ({ value, label })) || [],
            name: 'area',
          }}
        />
      </S.Container>
      <S.Container>
        <S.Button onClick={goToRegisterPage}>등록하기</S.Button>
      </S.Container>
      {isLoading ? (
        <Loading />
      ) : (
        <ImageContainer>
          {recruitsData?.data.map((recruitsProps: RecruitsPropsTypes) => (
            <RecruitsImagesComponent key={recruitsProps.id} recruitsProps={recruitsProps} />
          ))}
        </ImageContainer>
      )}
      <div ref={ref} style={{ height: 50 }} />
      <ScrollToTopButton onClick={scrollToTop}>
        <RiArrowUpDoubleFill />
      </ScrollToTopButton>
    </>
  );
};

export default Recruits;
