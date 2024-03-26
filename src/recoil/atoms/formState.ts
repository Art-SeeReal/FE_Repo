import { atomFamily } from 'recoil';

const STATE_KEY = {
  form: 'form',
};

interface IData<T> {
  [key: string]: T;
}

export type FormValues = IData<string>;
export type FormErrors = IData<string>;
export type FormTouched = IData<boolean>;

interface FormState {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
}

export const formState = atomFamily<FormState, FormValues>({
  key: STATE_KEY.form,
  default: (initialValue) => ({
    values: initialValue,
    errors: {},
    touched: {},
  }),
});
