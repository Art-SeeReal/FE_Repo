import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import * as S from '../../components/styles';
import RecruitItem from './RecruitItem';
import SearchBar from '../../components/Searchbar';
import InfiniteList from '../../components/InfiniteList';

import { useFetchRecruits } from '../../hooks/query/useRecruitsQuery';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';
import { useFetchRegions, useFetchFields } from '../../hooks/query/useUtilQuery';

const StyledRecruitList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin-top: 10rem;

  ${S.Media.tablet`
    gap: 2rem;
  `}

  ${S.Media.mobile`
    margin-top: 5rem;
  `}
`;

const StyledSearchFilterBar = styled.div`
  display: flex;
  gap: 2rem;
  flex-flow: wrap;

  ${S.Media.tablet`
    flex-direction: column;
  `}

  ${S.Button} {
    margin-left: auto;

    ${S.Media.tablet`
      width: 100%;
    `}
  }
`;

const Recruits = () => {
  const [page, setPage] = useState(20);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [searchKeywords, setSearchKeywords] = useState('');
  const {
    data: recruitsData,
    refetch,
    isLoading,
    isFetching,
  } = useFetchRecruits({
    page,
    regions: selectedRegions,
    fields: selectedFields,
    keyWords: searchKeywords,
  });
  const { data: regionsData } = useFetchRegions();
  const { data: fieldsData } = useFetchFields();
  const navigate = useNavigate();

  const goToRegisterPage = () => {
    navigate('/recruits/register');
  };

  const onLoadMore = () => {
    refetch();
    setPage(page + 20);
  };

  useEffect(() => {
    refetch();
  }, [selectedFields, selectedRegions, searchKeywords]);

  return (
    <>
      <StyledSearchFilterBar>
        <MultipleDropdownMenu
          values={selectedRegions}
          setValues={(values) => setSelectedRegions(values)}
          defaultLabel="지역"
          checkboxGroup={{
            initialValues: [],
            data: regionsData?.results.map(({ code: value, label }) => ({ value, label })) || [],
            name: 'region',
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
        <S.Button onClick={goToRegisterPage}>등록하기</S.Button>
      </StyledSearchFilterBar>

      <InfiniteList onLoadMore={onLoadMore} isLoading={isLoading} isFetching={isFetching}>
        <StyledRecruitList>
          {recruitsData?.results.map((recruit) => <RecruitItem key={recruit.id} data={recruit} />)}
        </StyledRecruitList>
      </InfiniteList>
    </>
  );
};

export default Recruits;
