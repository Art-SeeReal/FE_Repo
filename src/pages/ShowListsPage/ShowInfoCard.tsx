import React from 'react';
import styled from 'styled-components';
import * as S from '../../components/styles';

interface FieldProps {
  fontSize?: string;
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
  };
}

const ShowInfoCard = ({ showList }: ShowListsProp) => {
  return (
    <S.Container $width={350} style={{ margin: '10px' }}>
      <S.Row>
        <S.Col className="p-3" $col={4}>
          <img src={showList.poster?._text} alt={showList?.prfnm._text} />
        </S.Col>
        <S.Col className="p-3" $col={8}>
          <Label className="my-3">{showList?.genrenm._text}</Label>
          <Field fontSize="14px">{showList?.prfnm._text}</Field>
          {showList?.area && <Field>위치: {showList?.area._text}</Field>}
          <Field>
            기간: {showList?.prfpdfrom._text} ~ {showList?.prfpdto._text}
          </Field>
        </S.Col>
      </S.Row>
    </S.Container>
  );
};

export default ShowInfoCard;
