import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as S from '../../components/styles';
import PortfolioItem from './PortfolioItem';
import SearchBar from '../../components/Searchbar';
import InfiniteList from '../../components/InfiniteList';

import { useFetchPortfolios } from '../../hooks/query/usePortfoliosQuery';
import { useFetchFields } from '../../hooks/query/useUtilQuery';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';
import { useFetchUserInfo } from '../../hooks/query/useUserQuery';

const PortfolioList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8rem 4rem;
  margin-top: 10rem;
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
    isError,
  } = useFetchPortfolios({
    page,
    fields: selectedField,
    keyWords: searchKeywords,
  });
  const { data: fieldData } = useFetchFields();
  const { data: userInfoData } = useFetchUserInfo();

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

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <>
      <S.Row $gap={20}>
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
        <div className="ml-auto">
          <S.Button onClick={goToRegisterPage}>등록하기</S.Button>
        </div>
      </S.Row>

      <InfiniteList onLoadMore={onLoadMore} isLoading={isLoading} isFetching={isFetching}>
        <PortfolioList>
          {userInfoData &&
            portfolioData?.results.map((portfolio) => (
              <PortfolioItem key={portfolio.id} data={portfolio} userInfo={userInfoData} />
            ))}
        </PortfolioList>
      </InfiniteList>
    </>
  );
};

export default PortfolioPage;
