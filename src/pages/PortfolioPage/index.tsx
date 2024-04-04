import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import PortfolioImagesComponent from './PortfolioImagesComponent';
import * as S from '../../components/styles';
import { useFetchPortfolios } from '../../hooks/query/usePortfoliosQuery';
import Loading from '../../components/Loading';
import { useFetchFields } from '../../hooks/query/useUtilQuery';
import { MultipleDropdownMenu } from '../../hooks/customs/useDropdown';
import ScrollToTop from '../../components/ScrollToTop';
import SearchBar from '../../components/Searchbar';
import { useFetchUserInfo } from '../../hooks/query/useUserQuery';

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  width: calc((100% - 20px) / 2);
  margin-bottom: 10px;
  padding: 20px;
  @media (max-width: 760px) {
    padding: 30px;
  }
  @media (max-width: 560px) {
    padding: 10px;
  }
`;

interface PortfolioPropsTypes {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  fields: {
    code: string;
    label: string;
  };
  isScrap: boolean;
  like: number;
  view: number;
  RegDate: string;
}

const PortfolioPage = () => {
  const [page, setPage] = useState(20);
  const navigate = useNavigate();
  const [selectedField, setSelectedField] = useState<string[]>([]);
  const [searchKeywords, setSearchKeywords] = useState('');
  const [ref, inView] = useInView({
    threshold: 1,
  });
  const {
    data: portfolioData,
    refetch,
    isLoading,
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
      <S.Row className="mx-5" $justifyContent="space-between">
        <S.Row>
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
        </S.Row>
        <S.Button onClick={goToRegisterPage}>등록하기</S.Button>
      </S.Row>
      <S.Container $paddingBottom>
        {isLoading ? (
          <S.Row $justifyContent="center">
            <Loading />
          </S.Row>
        ) : (
          <ImageContainer>
            {userInfoData &&
              portfolioData?.results.map((portfolioProps: PortfolioPropsTypes) => (
                <ImageWrapper key={portfolioProps.id}>
                  <PortfolioImagesComponent portfolioProps={portfolioProps} userInfo={userInfoData} />
                </ImageWrapper>
              ))}
          </ImageContainer>
        )}
      </S.Container>
      <div ref={ref} style={{ height: 10 }} />
      <ScrollToTop />
    </S.Container>
  );
};

export default PortfolioPage;
