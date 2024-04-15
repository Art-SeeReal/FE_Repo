import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useFetchRecruits } from '../../hooks/query/useRecruitsQuery';
import RecruitsImagesComponent from './RecruitsImagesComponent';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';
import * as S from '../../components/styles';
import { useFetchRegions, useFetchFields } from '../../hooks/query/useUtilQuery';
import Loading from '../../components/Loading';
import ScrollToTop from '../../components/ScrollToTop';
import SearchBar from '../../components/Searchbar';
import { useFetchUserInfo } from '../../hooks/query/useUserQuery';

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

interface RecruitsPropsTypes {
  id: number;
  name: string;
  title: string;
  regions: {
    code: string;
    label: string;
  };
  fields: {
    code: string;
    label: string;
  };
  isScrap: boolean;
  view: number;
  RegDate: string;
  content: string;
}

const Recruits = () => {
  const [page, setPage] = useState(20);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [searchKeywords, setSearchKeywords] = useState('');
  const {
    data: recruitsData,
    refetch,
    isLoading,
    isError,
  } = useFetchRecruits({
    page,
    regions: selectedRegions,
    fields: selectedFields,
    keyWords: searchKeywords,
  });
  const { data: regionsData } = useFetchRegions();
  const { data: fieldsData } = useFetchFields();
  const { data: userInfoData } = useFetchUserInfo();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 1,
  });

  const goToRegisterPage = () => {
    navigate('/recruits/register');
  };

  useEffect(() => {
    refetch();
  }, [selectedFields, selectedRegions, searchKeywords]);

  useEffect(() => {
    if (inView && !isLoading) {
      refetch();
      setPage(page + 20);
    }
  }, [inView, isLoading]);

  if (isError) {
    return <div>에러</div>;
  }
  return (
    <S.Container>
      <S.Row className="mx-2" $justifyContent="space-around">
        <MultipleDropdownMenu
          values={selectedRegions}
          setValues={(values) => setSelectedRegions(values)}
          defaultLabel="지역"
          checkboxGroup={{
            initialValues: [],
            data: regionsData?.results.map(({ code: value, label }) => ({ value, label })) || [],
            name: 'area',
          }}
        />
        <MultipleDropdownMenu
          values={selectedFields}
          setValues={(values) => setSelectedFields(values)}
          defaultLabel="분야"
          checkboxGroup={{
            initialValues: [],
            data: fieldsData?.results.map(({ code: value, label }) => ({ value, label })) || [],
            name: 'field',
          }}
        />
        <SearchBar placeholder="검색어를 입력해주세요" onSearch={setSearchKeywords} />
        <S.Col>
          <S.Row className="mx-5" $justifyContent="flex-end">
            <S.Button onClick={goToRegisterPage}>등록하기</S.Button>
          </S.Row>
        </S.Col>
      </S.Row>
      {isLoading ? (
        <Loading />
      ) : (
        <ImageContainer>
          {recruitsData?.results.map(
            (recruitsProps: RecruitsPropsTypes) =>
              userInfoData && (
                <RecruitsImagesComponent key={recruitsProps.id} recruitsProps={recruitsProps} userInfo={userInfoData} />
              ),
          )}
        </ImageContainer>
      )}
      <div ref={ref} style={{ height: 50 }} />
      <ScrollToTop />
    </S.Container>
  );
};

export default Recruits;
