import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as S from '../../components/styles';
import PortfolioItem from '../../components/PortfolioItem';
import SearchBar from '../../components/Searchbar';
import InfiniteList from '../../components/InfiniteList';

import { useFetchPortfolios } from '../../hooks/query/usePortfoliosQuery';
import { useFetchFields } from '../../hooks/query/useUtilQuery';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';

const StyledPortfolioList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8rem 4rem;
  margin-top: 10rem;

  ${S.Media.mobile`
    gap: 4rem;
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

const PortfolioPage = () => {
  const [page, setPage] = useState(20);
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState<string[]>([]);
  const [searchKeywords, setSearchKeywords] = useState('');
  const {
    data: portfolioData,
    refetch,
    isLoading,
    isFetching,
  } = useFetchPortfolios({
    page,
    fields: selectedField,
    keyWords: searchKeywords,
  });
  const { data: fieldData } = useFetchFields();

  const goToRegisterPage = () => {
    navigate('/portfolios/register');
  };

  useEffect(() => {
    refetch();
  }, [selectedField, searchKeywords]);

  const onLoadMore = () => {
    refetch();
    setPage(page + 20);
  };

  return (
    <>
      <StyledSearchFilterBar>
        <MultipleDropdownMenu
          values={selectedField}
          setValues={(values) => setSelectedField(values)}
          defaultLabel="분야"
          checkboxGroup={{
            initialValues: [],
            data: fieldData?.results.map(({ code: value, label }) => ({ value, label })) || [],
            name: 'field',
          }}
        />
        <SearchBar placeholder="검색어를 입력해주세요" onSearch={setSearchKeywords} />
        <S.Button onClick={goToRegisterPage}>등록하기</S.Button>
      </StyledSearchFilterBar>

      <InfiniteList onLoadMore={onLoadMore} isLoading={isLoading} isFetching={isFetching}>
        <StyledPortfolioList>
          {portfolioData?.results.map((portfolio) => <PortfolioItem key={portfolio.id} data={portfolio} />)}
        </StyledPortfolioList>
      </InfiniteList>
    </>
  );
};

export default PortfolioPage;
