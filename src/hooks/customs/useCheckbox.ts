import { ChangeEvent, useState } from 'react';

export const useCheckbox = (checked: boolean) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return {
    isChecked,
    handleChange,
  };
};

export const useCheckboxGroup = (initialValue: string[]) => {
  const [checkboxValues, setCheckboxValues] = useState(initialValue);

  const isChecked = (value: string) => checkboxValues.includes(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckboxValues((prev) => [...prev, e.target.value]);
    } else {
      setCheckboxValues(checkboxValues.filter((v) => v !== e.target.value));
    }
  };

  const resetCheckboxGroup = () => setCheckboxValues(initialValue);

  return {
    checkboxValues,
    setCheckboxValues,
    isChecked,
    handleChange,
    resetCheckboxGroup,
  };
};
