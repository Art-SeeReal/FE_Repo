import React from 'react';
import * as S from '../../../components/styles';
import { OnSubmitFn, ValidateFn, useForm } from '../../../hooks/customs/useFormState';
import { passwordErrorMessage } from '../../../utils/validation';
import FormControl from '../../../components/FormControl';
import ErrorMessage from '../../../components/ErrorMessage';
import Form from '../../../components/Form';
import { useCheckPassword } from '../../../hooks/query/useUserQuery';
import InfoForm from './InfoForm';

const Info = () => {
  const initialValue = {
    password: '',
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      password: passwordErrorMessage(values.password),
    };

    return errors;
  };
  const { mutate: checkPassword, isSuccess } = useCheckPassword();

  const onSubmit: OnSubmitFn = ({ password }) => {
    checkPassword({ password });
  };
  const { errors, touched, handleSubmit, getFieldProps } = useForm({ initialValue, validate, onSubmit });

  return isSuccess ? (
    <InfoForm />
  ) : (
    <S.Container $width={400}>
      <Form id="check-pw-form" onSubmit={handleSubmit}>
        <FormControl
          label="비밀번호"
          htmlFor="password"
          required
          error={<ErrorMessage touched={touched.password} message={errors.password} />}
        >
          <S.Field
            id="password"
            {...getFieldProps('password')}
            type="password"
            placeholder="비밀번호"
            autoComplete="new-password"
          />
        </FormControl>
        <S.Button type="submit" $block>
          비밀번호 확인
        </S.Button>
      </Form>
    </S.Container>
  );
};

export default Info;
