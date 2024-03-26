import { ChangeEvent, FocusEvent, FormEvent, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { FormValues, FormErrors, FormTouched, formState } from '../../recoil/atoms/formState';

type FormTypes = HTMLInputElement | HTMLTextAreaElement;

// TODO: IData export는 추후 삭제 될 예정, IData 끌어 쓰는 모든 페이지 수정 필
export interface IData<T> {
  [key: string]: T;
}

export type ValidateFn = (values: FormValues) => FormErrors;
export type OnSubmitFn = (values: FormValues) => void;

interface FormHookArgs {
  initialValue: FormValues;
  validate?: ValidateFn;
  onSubmit: OnSubmitFn;
}

export const useForm = ({ initialValue, validate, onSubmit }: FormHookArgs) => {
  const [form, setForm] = useRecoilState(formState(initialValue));
  const [triedSubmit, setTriedSubmit] = useState(0);

  const resetForm = () => {
    setForm((prev) => {
      const values = Object.keys(prev.values).reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});
      const errors = Object.keys(prev.errors).reduce((acc, cur) => ({ ...acc, [cur]: '' }), {});
      const touched = Object.keys(prev.touched).reduce((acc, cur) => ({ ...acc, [cur]: false }), {});

      return { values, errors, touched };
    });
  };

  const handleChange = (e: ChangeEvent<FormTypes>) => {
    setForm((prev) => ({ ...prev, values: { ...prev.values, [e.target.name]: e.target.value } }));
  };

  const handleBlur = (e: FocusEvent<FormTypes>) => {
    setForm((prev) => ({ ...prev, touched: { ...prev.touched, [e.target.name]: true } }));
  };

  const setFormValue = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, values: { ...prev.values, [name]: value } }));
  };

  const setFormTouched = (name: string) => {
    setForm((prev) => ({ ...prev, touched: { ...prev.touched, [name]: true } }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setForm((prev) => ({
      ...prev,
      touched: Object.keys(prev.values).reduce((touched, field) => {
        return { ...touched, [field]: true };
      }, {}),
    }));

    if (validate) {
      setForm((prev) => ({
        ...prev,
        errors: validate(prev.values),
      }));
    }

    setTriedSubmit(+new Date());
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

  const getQuillProps = (name: string) => {
    const content = form.values[name] || '';
    const onBlur = () => setFormTouched(name);
    const onChange = (value: string) => setFormValue(name, value);

    return { content, onBlur, onChange };
  };

  const getUploadProps = (name: string) => {
    const onSuccess = (fileUrl: string) => setFormValue(name, fileUrl);
    const onReset = () => setFormValue(name, '');

    return { name, onSuccess, onReset };
  };

  const getCheckProps = (name: string, value: string) => {
    const checkedValue = form.values[name] || '';
    const checked = form.values[name] === value;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setFormValue(name, value);
      } else {
        setFormValue(name, '');
      }
    };

    return { name, value: checkedValue, checked, onChange };
  };

  useEffect(() => {
    if (!triedSubmit) return;

    if (Object.values(form.errors).some(Boolean)) {
      setTriedSubmit(0);
    } else {
      onSubmit(form.values);
    }
  }, [triedSubmit]);

  useEffect(() => {
    if (!validate) return;

    setForm((prev) => ({
      ...prev,
      errors: validate(prev.values),
    }));
  }, [form.values]);

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  return {
    ...form,
    resetForm,
    setFormValue,
    setFormTouched,
    getFieldProps,
    getQuillProps,
    getUploadProps,
    getCheckProps,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export interface FormHookReturns {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  handleChange: (e: ChangeEvent<FormTypes>) => void;
  setFormValue: (name: string, value: string) => void;
  setFormTouched: (name: string) => void;
  handleBlur: (e: FocusEvent<FormTypes>) => void;
  handleSubmit: (e: FormEvent) => void;
  getFieldProps: (name: string) => {
    name: string;
    value: string;
    onBlur: (e: FocusEvent<FormTypes>) => void;
    onChange: (e: ChangeEvent<FormTypes>) => void;
  };
}
