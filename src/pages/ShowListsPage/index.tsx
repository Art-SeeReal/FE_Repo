import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useFetchShowLists } from '../../hooks/query/useApiQuery';
import * as S from '../../components/styles';
import ShowInfoCard from './ShowInfoCard';

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

interface ShowListProp {
  fcltynm: {
    _text: string;
  };
  genrenm: {
    _text: string;
  };
  mt20id: {
    _text: string;
  };
  openrun: {
    _text: string;
  };
  poster?: {
    _text?: string;
  };
  prfnm: {
    _text: string;
  };
  prfpdfrom: {
    _text: string;
  };
  prfpdto: {
    _text: string;
  };
  prfstate: {
    _text: string;
  };
  area: {
    _text: string;
  };
}

const Index = () => {
  const { data: showLists } = useFetchShowLists();

  useEffect(() => {
    console.log(showLists?.dbs.db);
  }, [showLists]);

  return (
    <S.Container $width={1200}>
      <S.Row>ㅇㅇㅇㅇ</S.Row>
      <S.Divider />
      <S.Row>
        <Card>
          {showLists?.dbs.db.map((showList: ShowListProp) => (
            <ShowInfoCard key={showList.mt20id._text} showList={showList} />
          ))}
        </Card>
      </S.Row>
    </S.Container>
  );
};

export default Index;
