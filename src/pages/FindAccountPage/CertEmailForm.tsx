import React from 'react';
import Form from '../../components/Form';
import FormControl from '../../components/FormControl';
import ErrorMessage from '../../components/ErrorMessage';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import * as S from '../../components/styles';
import { isEmptyValue } from '../../utils/validation';
import { useCertEmail } from '../../hooks/query/useUserQuery';
import ChangePasswordForm from './ChangePasswordForm';

interface Props {
  sentEmail: string;
}

const CertEmailForm = ({ sentEmail }: Props) => {
  const initialValue = {
    certCode: '',
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      certCode: isEmptyValue(values.certCode) ? '인증코드를 입력하세요.' : '',
    };

    return errors;
  };

  const { mutate: certEmail, data, isPending, isSuccess } = useCertEmail();

  const onSubmit: OnSubmitFn = (values) => {
    certEmail({ certCode: values.certCode });
  };

  const { errors, touched, handleSubmit, getFieldProps } = useForm({ initialValue, validate, onSubmit });
  return (
    <div>
      {isSuccess ? (
        <ChangePasswordForm token={data.data.token} />
      ) : (
        <Form id="form-cert-email" onSubmit={handleSubmit}>
          <S.Description $size="small" className="my-5">
            <strong className="bold">{sentEmail}</strong>로 인증코드를 발송했습니다.
          </S.Description>
          <FormControl
            label="인증코드"
            htmlFor="certCode"
            required
            error={<ErrorMessage touched={touched.certCode} message={errors.certCode} />}
          >
            <S.Field id="certCode" {...getFieldProps('certCode')} type="text" placeholder="인증코드" />
          </FormControl>
          <S.Button type="submit" $block disabled={isPending}>
            인증
          </S.Button>
        </Form>
      )}
    </div>
  );
};

export default CertEmailForm;
