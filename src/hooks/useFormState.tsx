import React, { ChangeEvent, FocusEvent, FormEvent, ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import { formState } from '../recoil/atoms/formState';
import * as S from '../components/styles';

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

  const handleChange = (e: ChangeEvent<FormTypes>) => {
    setForm(() => ({ ...form, values: { ...form.values, [e.target.name]: e.target.value } }));
  };

  const handleBlur = (e: FocusEvent<FormTypes>) => {
    setForm(() => ({ ...form, touched: { ...form.touched, [e.target.name]: true } }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setForm(() => ({
      ...form,
      touched: Object.keys(form.values).reduce((touched, field) => {
        return { ...touched, [field]: true };
      }, {}),
      errors: validate(form.values),
    }));

    // 만약 errors의 값이 하나라도 있다면 Submit 막음.
    if (Object.values(form.errors).some(Boolean)) {
      return;
    }

    onSubmit(form.values);
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

  React.useEffect(() => {
    setForm(() => ({
      ...form,
      errors: validate(form.values),
    }));
  }, [form.values]);

  return {
    ...form,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
};

const formContext = React.createContext({});
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

interface FieldArgs {
  as?: 'input' | 'textarea' | 'select';
  type?: 'text' | 'password' | 'email' | 'url';
  children?: ReactNode;
  id?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent) => void;
}

interface FormValues {
  getFieldProps: (name: string) => {
    name: string;
    value: string;
    onBlur: (e: FocusEvent<FormTypes>) => void;
    onChange: (e: ChangeEvent<FormTypes>) => void;
  };
  touched: IData<boolean>;
  errors: IData<string>;
}

export const Field = ({ as = 'input', type = 'text', children, ...rest }: FieldArgs) => {
  const { getFieldProps } = React.useContext(formContext) as FormValues;
  const { name, value, onBlur, onChange } = getFieldProps(rest.name);
  return React.createElement(S.Field, { as, type, ...rest, name, value, onBlur, onChange }, children);
};

export const ErrorMessage = ({ name }: { name: string }) => {
  const { touched, errors } = React.useContext(formContext) as FormValues;
  if (!touched[name] || !errors[name]) return null;
  return <S.ErrorMessage>{errors[name]}</S.ErrorMessage>;
};
