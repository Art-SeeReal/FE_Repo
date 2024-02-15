import { atom } from 'recoil';

const STATE_KEY = {
  form: 'form',
};

interface IData<T> {
  [key: string]: T;
}

interface Form {
  values: IData<string>;
  errors: IData<string>;
  touched: IData<boolean>;
}

export const formState = atom<Form>({
  key: STATE_KEY.form,
  default: {
    values: {},
    errors: {},
    touched: {},
  },
});
