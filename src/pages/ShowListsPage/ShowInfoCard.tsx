import React from 'react';
import styled from 'styled-components';
import * as S from '../../components/styles';

interface FieldProps {
  fontSize?: string; // fontSize를 옵션으로 설정
}

const Field = styled.div<FieldProps>`
  font-size: ${({ fontSize }) => fontSize || '12px'};
  margin-bottom: 5px;
`;

const Label = styled.label`
  font-size: 10px;
  padding: 2px 6px;
  border: 1px solid #e58ae6;
  border-radius: 4px;
  color: #e58ae6;
`;

interface ShowListsProp {
  showList: {
    id: number;
    poster: string;
    title: string;
    regions: {
      code: string;
      label: string;
    };
    fields: {
      code: string;
      label: string;
    };
    RegDate: string;
  };
}

const ShowInfoCard = ({ showList }: ShowListsProp) => {
  console.log(showList);
  return (
    <S.Container $width={350}>
      <S.Row>
        <S.Col className="p-3" $col={4}>
          <img src={showList.poster} alt={showList.title} />
        </S.Col>
        <S.Col className="p-3" $col={8}>
          <Label className="my-3">{showList.fields.label}</Label>
          <Field fontSize="14px">{showList.title}</Field>
          <Field>위치: {showList.regions.label}</Field>
          <Field>기간: {showList.RegDate}</Field>
        </S.Col>
      </S.Row>
    </S.Container>
  );
};

export default ShowInfoCard;
