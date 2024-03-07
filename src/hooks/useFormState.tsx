import React, { ChangeEvent, FocusEvent, FormEvent, ReactNode, useState, useEffect, useContext } from 'react';
import { useRecoilState } from 'recoil';
import { formState } from '../recoil/atoms/formState';
import * as S from '../components/styles';
import type { FieldProps } from '../components/styles/Field';

type FormTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface IData<T> {
  [key: string]: T;
}

interface FormHookArgs {
  initialValue: IData<string>;
  validate: (values: IData<string>) => IData<string>;
  onSubmit: (values: IData<string>) => void;
}

export const useForm = ({ initialValue, validate, onSubmit }: FormHookArgs) => {
  const [form, setForm] = useRecoilState(formState(initialValue));
  const [isTriedSubmit, setIsTriedSubmit] = useState(false);

  const handleChange = (e: ChangeEvent<FormTypes>) => {
    setForm((prev) => ({ ...prev, values: { ...prev.values, [e.target.name]: e.target.value } }));
  };

  const handleUploadSuccess = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, values: { ...prev.values, [name]: value } }));
  };

  const handleBlur = (e: FocusEvent<FormTypes>) => {
    setForm((prev) => ({ ...prev, touched: { ...prev.touched, [e.target.name]: true } }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setForm((prev) => ({
      ...prev,
      touched: Object.keys(prev.values).reduce((touched, field) => {
        return { ...touched, [field]: true };
      }, {}),
      errors: validate(prev.values),
    }));

    setIsTriedSubmit(true);
  };

  const getFieldProps = (name: string) => {
    // setForm이 비동기로 동작하기때문에 처음 render됐을 때,
    // value가 undefined이여서 warning이 생김 (controlled-components)
    // -> 기본값으로 빈 문자열을 할당함.
    const value = form.values[name] || '';
    const onBlur = handleBlur;
    const onChange = handleChange;

    return { name, value, onBlur, onChange };
  };

  useEffect(() => {
    if (!isTriedSubmit) return;

    if (Object.values(form.errors).some(Boolean)) {
      setIsTriedSubmit(false);
    } else {
      onSubmit(form.values);
    }
  }, [isTriedSubmit, form.errors]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      errors: validate(prev.values),
    }));
  }, [form.values]);

  return {
    ...form,
    handleChange,
    handleUploadSuccess,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
};

export interface FormHookReturns {
  values: IData<string>;
  errors: IData<string>;
  touched: IData<boolean>;
  handleChange: (e: ChangeEvent<FormTypes>) => void;
  handleUploadSuccess: (name: string, value: string) => void;
  handleBlur: (e: FocusEvent<FormTypes>) => void;
  handleSubmit: (e: FormEvent) => void;
  getFieldProps: (name: string) => {
    name: string;
    value: string;
    onBlur: (e: FocusEvent<FormTypes>) => void;
    onChange: (e: ChangeEvent<FormTypes>) => void;
  };
}

export const formContext = React.createContext({});
formContext.displayName = 'FormContext';

interface FormArgs extends FormHookArgs {
  id: string;
  children: ReactNode;
}

export const Form = ({ id, children, initialValue, validate, onSubmit }: FormArgs) => {
  const formValue = useForm({ initialValue, validate, onSubmit });

  return (
    <formContext.Provider value={formValue}>
      <form noValidate id={id} onSubmit={formValue.handleSubmit}>
        {children}
      </form>
    </formContext.Provider>
  );
};

interface FieldArgs extends FieldProps {
  type?: 'text' | 'password' | 'email' | 'url';
  id?: string;
  name: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  maxLength?: number;
  onChange?: (e: ChangeEvent) => void;
}

export const Field = ({ as = 'input', type = 'text', children, ...rest }: FieldArgs) => {
  const { getFieldProps, touched, errors } = useContext(formContext) as FormHookReturns;
  const { name, value, onBlur, onChange } = getFieldProps(rest.name);

  const $error = !!(touched[name] && errors[name]);

  return (
    <S.Field as={as} type={type} value={value} onBlur={onBlur} onChange={onChange} $error={$error} {...rest}>
      {children}
    </S.Field>
  );
};

export const ErrorMessage = ({ name }: { name: string }) => {
  const { touched, errors } = useContext(formContext) as FormHookReturns;
  if (!touched[name] || !errors[name]) return null;
  return <S.ErrorMessage>{errors[name]}</S.ErrorMessage>;
};
