import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import FormControl from '../../components/FormControl';
import ErrorMessage from '../../components/ErrorMessage';
import Dialog from '../../components/Dialog';
import { useForm, ValidateFn, OnSubmitFn } from '../../hooks/customs/useFormState';
import * as S from '../../components/styles';
import { passwordErrorMessage, passwordCheckErrorMessage } from '../../utils/validation';
import { useChangePassword } from '../../hooks/query/useUserQuery';
import { useDialog } from '../../hooks/customs/useDialogState';

interface Props {
  token: string;
}

const ChangePasswordForm = ({ token }: Props) => {
  const initialValue = {
    newPassword: '',
    newPasswordCheck: '',
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      newPassword: passwordErrorMessage(values.newPassword),
      newPasswordCheck: passwordCheckErrorMessage(values.newPassword, values.newPasswordCheck),
    };

    return errors;
  };

  const { mutate: changePassword, isPending, isSuccess } = useChangePassword();

  const onSubmit: OnSubmitFn = (values) => {
    changePassword({ token, newPassword: values.newPassword });
  };

  const { errors, touched, handleSubmit, getFieldProps, resetForm } = useForm({ initialValue, validate, onSubmit });

  // 비밀번호 변경 완료 후 로직
  const navigate = useNavigate();
  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    if (!isSuccess) return;

    const handleClickConfirm = () => {
      closeDialog();
      resetForm();
      navigate('/login');
    };

    openDialog(
      <Dialog header="비밀번호 변경 완료" footer={<S.Button onClick={handleClickConfirm}>로그인 페이지로</S.Button>}>
        비밀번호 변경이 완료되었습니다.
      </Dialog>,
    );
  }, [isSuccess]);

  return (
    <Form id="form-change-password" onSubmit={handleSubmit}>
      <FormControl
        label="새 비밀번호"
        htmlFor="newPassword"
        required
        error={<ErrorMessage touched={touched.newPassword} message={errors.newPassword} />}
      >
        <S.Field
          id="newPassword"
          {...getFieldProps('newPassword')}
          type="password"
          placeholder="새 비밀번호"
          autoComplete="new-password"
        />
      </FormControl>

      <FormControl
        label="새 비밀번호 확인"
        htmlFor="newPasswordCheck"
        required
        error={<ErrorMessage touched={touched.newPasswordCheck} message={errors.newPasswordCheck} />}
      >
        <S.Field
          id="newPasswordCheck"
          {...getFieldProps('newPasswordCheck')}
          type="password"
          placeholder="새 비밀번호 확인"
          autoComplete="new-password"
        />
      </FormControl>

      <S.Button type="submit" $block disabled={isPending || isSuccess}>
        비밀번호 변경
      </S.Button>
    </Form>
  );
};

export default ChangePasswordForm;
