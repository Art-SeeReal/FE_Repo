import React, { useState, useEffect } from 'react';
import { useCheckbox, useCheckboxGroup } from '../../hooks/useCheckbox';
import Checkbox from '../../components/Checkbox';
import * as S from '../../components/styles';
import { useFetchAreas } from '../../hooks/useUtilQuery';
import { MultipleDropdownMenu } from '../../hooks/useDropdown';

const SecondPage = () => {
  const { isChecked: agree, handleChange: onChageAgree } = useCheckbox(false);
  const { data } = useFetchAreas();
  const {
    checkboxValues: areas,
    isChecked: includeAreas,
    handleChange: onChangeArea,
    resetCheckboxGroup: resetAreas,
  } = useCheckboxGroup([]);

  const initialValue = 'Q000';
  const [selectedAreas, setSelectedAreas] = useState<string[]>([initialValue]);

  useEffect(() => console.log('###selectedAreas: ', selectedAreas), [selectedAreas]);

  return (
    <>
      <S.Container $paddingBottom>
        <S.Title>단일 체크박스 컴포넌트</S.Title>
        <Checkbox id="agree" name="agree" value="1" checked={agree} onChange={onChageAgree}>
          동의
        </Checkbox>

        <S.Button
          onClick={() => {
            if (!agree) {
              console.log('동의에 체크하세요.');
              return;
            }
            console.log('제출 완료');
          }}
        >
          제출
        </S.Button>
      </S.Container>

      <S.Container $paddingBottom>
        <S.Title>체크박스 그룹 컴포넌트</S.Title>
        {data?.results.map(({ code, label }) => (
          <Checkbox
            key={code}
            id={code}
            value={code}
            name="area"
            onChange={onChangeArea}
            checked={includeAreas(code)}
            $style="button"
          >
            {label}
          </Checkbox>
        ))}

        <div>{areas && areas.join(', ')}</div>

        <div>
          <S.Button onClick={() => resetAreas()}>초기화</S.Button>
        </div>
      </S.Container>

      <S.Container $paddingBottom>
        <S.Title>멀티 드롭다운 메뉴 컴포넌트</S.Title>
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
    </>
  );
};

export default SecondPage;
