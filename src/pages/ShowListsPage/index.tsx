import React, { useEffect } from 'react';
// import styled from 'styled-components';
import { useFetchShowLists } from '../../hooks/query/useApiQuery';
import * as S from '../../components/styles';
// import ShowInfoCard from './ShowInfoCard';

// const Card = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
// `;

// interface ShowListProp {
//   id: number;
//   poster: string;
//   title: string;
//   regions: {
//     code: string;
//     label: string;
//   };
//   fields: {
//     code: string;
//     label: string;
//   };
//   RegDate: string;
// }

const Index = () => {
  const { data: showLists } = useFetchShowLists();

  useEffect(() => {
    console.log(showLists);
  }, [showLists]);

  return (
    <S.Container $width={1200}>
      <S.Row>ㅇㅇㅇㅇ</S.Row>
      <S.Divider />
      <S.Row>
        {/* <Card>
          {showLists?.results.map((showList: ShowListProp) => <ShowInfoCard key={showList.id} showList={showList} />)}
        </Card> */}
      </S.Row>
    </S.Container>
  );
};

export default Index;
