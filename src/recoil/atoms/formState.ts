import { atomFamily } from 'recoil';

const STATE_KEY = {
  form: 'form',
};

interface IData<T> {
  [key: string]: T;
}

export const formState = atomFamily({
  key: STATE_KEY.form,
  default: (initialValue: IData<string>) => ({
    values: initialValue,
    errors: {} as IData<string>,
    touched: {} as IData<boolean>,
  }),
});
