import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useFetchAreas } from '../../hooks/useUtilQuery';
import { MultipleDropdownMenu } from '../../hooks/useDropdown';
import { selectedAreasState } from '../../recoil/atoms/artistBoardState';
import * as S from '../../components/styles';

const Multidown = () => {
  const { data } = useFetchAreas();
  const initialValue = 'Q000';
  const setSelectedAreasState = useSetRecoilState(selectedAreasState);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([initialValue]);

  useEffect(() => {
    setSelectedAreasState(selectedAreas);
  }, [selectedAreas]);

  return (
    <>
      <S.Container>
        <MultipleDropdownMenu
          values={selectedAreas}
          setValues={(values) => setSelectedAreas(values)}
          defaultLabel="지역"
          checkboxGroup={{
            initialValues: [initialValue],
            data: data?.results.map(({ code: value, label }) => ({ value, label })) || [],
            name: 'area',
          }}
        />
      </S.Container>
      <S.Container>
        <S.Button>등록하기</S.Button>
      </S.Container>
    </>
  );
};

export default Multidown;
