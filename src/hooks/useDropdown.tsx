import React, { useEffect, useState } from 'react';
import { useCheckboxGroup } from './useCheckbox';
import { generateStr } from '../utils/utils';
import Dropdown from '../components/Dropdown';
import Checkbox from '../components/Checkbox';
import * as S from '../components/styles';

export const useDropdown = (defaultLabel: string) => {
  const [label, setLabel] = useState(defaultLabel);
  const [isOpened, setIsOpened] = useState(false);

  const resetLabel = () => setLabel(defaultLabel);

  const openMenu = () => setIsOpened(true);
  const closeMenu = () => setIsOpened(false);
  const toggleMenu = () => setIsOpened(!isOpened);

  return {
    label,
    setLabel,
    resetLabel,
    isOpened,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};

interface MultipleDropdownMenuArgs {
  defaultLabel: string;
  values: string[];
  setValues: (values: string[]) => void;
  checkboxGroup: {
    initialValues: string[];
    data: { value: string; label: string }[] | [];
    name: string;
  };
}

export const MultipleDropdownMenu = ({ defaultLabel, values, setValues, checkboxGroup }: MultipleDropdownMenuArgs) => {
  const { label: dropdownLabel, closeMenu, toggleMenu, isOpened, resetLabel, setLabel } = useDropdown(defaultLabel);
  const { checkboxValues, setCheckboxValues, isChecked, handleChange, resetCheckboxGroup } = useCheckboxGroup(
    checkboxGroup.initialValues,
  );

  const handleToggleMenu = () => {
    if (!checkboxValues.every((v, i) => v === values[i])) {
      setCheckboxValues(values);
    }
    toggleMenu();
  };

  const handleReset = () => {
    resetLabel();
    resetCheckboxGroup();
    setValues(checkboxGroup.initialValues);

    closeMenu();
  };

  const getFirstLabelInValues = () => checkboxGroup.data.find(({ value }) => value === checkboxValues[0])?.label || '';

  const changeLabelByValues = (searchValues: string[]) => {
    if (searchValues.length === 0) {
      resetLabel();
    } else if (searchValues.length === 1) {
      setLabel(getFirstLabelInValues());
    } else {
      setLabel(`${getFirstLabelInValues()} 외 ${searchValues.length - 1} 건`);
    }
  };

  const handleConfirm = () => {
    setValues([...checkboxValues]);

    changeLabelByValues(checkboxValues);

    closeMenu();
  };

  useEffect(() => {
    changeLabelByValues(values);
  }, [checkboxGroup.data]);

  return (
    <Dropdown label={dropdownLabel} toggleMenu={handleToggleMenu} openedMenu={isOpened}>
      <div className="menu-list is-multiple">
        {checkboxGroup.data.map(({ value, label }) => (
          <Checkbox
            key={generateStr(4)}
            id={generateStr(4)}
            name={checkboxGroup.name}
            value={value}
            checked={isChecked(value)}
            onChange={handleChange}
            $style="button"
          >
            {label}
          </Checkbox>
        ))}
      </div>
      <footer className="footer">
        <S.Button onClick={handleReset}>초기화</S.Button>
        <S.Button onClick={handleConfirm}>적용</S.Button>
      </footer>
    </Dropdown>
  );
};
