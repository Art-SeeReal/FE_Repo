import React, { useCallback, useEffect } from 'react';
import Form from '../../../components/Form';
import FormControl from '../../../components/FormControl';
import ErrorMessage from '../../../components/ErrorMessage';
import Dialog from '../../../components/Dialog';
import Radio from '../../../components/Radio';
import Checkbox from '../../../components/Checkbox';
import ExistCheckForm from '../../SignupFormPage/ExistCheckForm';
import * as S from '../../../components/styles';
import {
  useFetchExistNickname,
  useFetchExistEmail,
  useFetchUser,
  useChangeInfo,
} from '../../../hooks/query/useUserQuery';
import { useForm, OnSubmitFn, ValidateFn } from '../../../hooks/customs/useFormState';
import { useDialog } from '../../../hooks/customs/useDialogState';
import { useToast } from '../../../hooks/customs/useToastState';
import {
  userIdErrorMessage,
  passwordErrorMessage,
  passwordCheckErrorMessage,
  nicknameErrorMessage,
  emailErrorMessage,
  existCheckErrorMessage,
} from '../../../utils/validation';
import { UserTypeAuthor, UserTypePlanner } from '../../../utils/constants';

const InfoForm = () => {
  const { data: userInfo } = useFetchUser();
  const initialValue = {
    name: userInfo?.name || '',
    phone: userInfo?.phone || '',
    phoneSecret: userInfo?.isPrivatePhone ? '1' : '',
    userId: userInfo?.userId || '',
    password: '',
    passwordCheck: '',
    nickname: userInfo?.nickname || '',
    email: userInfo?.email || '',
    emailSecret: userInfo?.isPrivateEmail ? '1' : '',
    userType: userInfo?.userType || '',
    availabledNickname: '',
    availabledEmail: '',
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      userId: userIdErrorMessage(values.userId),
      password: passwordErrorMessage(values.password),
      passwordCheck: passwordCheckErrorMessage(values.password, values.passwordCheck),
      nickname: nicknameErrorMessage(values.nickname),
      email: emailErrorMessage(values.email),
      userType: [UserTypeAuthor, UserTypePlanner].includes(values.userType) ? '' : '회원유형을 선택하세요.',
    };

    return errors;
  };

  const { mutate: changeInfo, isPending, isSuccess } = useChangeInfo();

  const { appendToast } = useToast();

  const onSubmit: OnSubmitFn = (values) => {
    const { password, nickname, email, emailSecret, phoneSecret, availabledNickname, availabledEmail } = values;
    const checkNicknameErrorMessage = existCheckErrorMessage(availabledNickname, '닉네임');
    const checkEmailErrorMessage = existCheckErrorMessage(availabledEmail, '이메일');

    if (checkNicknameErrorMessage) {
      //   if (nickname === userInfo?.nickname) return;
      appendToast({ content: checkNicknameErrorMessage, type: 'error' });
      return;
    }

    if (checkEmailErrorMessage) {
      //   if (email === userInfo?.email) return;
      appendToast({ content: checkEmailErrorMessage, type: 'error' });
      return;
    }

    changeInfo({
      password,
      nickname,
      email,
      emailSecret: emailSecret === '1',
      phoneSecret: phoneSecret === '1',
    });
  };

  const { values, errors, touched, getCheckProps, getFieldProps, handleSubmit, resetForm, setFormValue } = useForm({
    initialValue,
    validate,
    onSubmit,
  });

  // 중복확인 훅 Query Result
  const fetchExistNickname = useFetchExistNickname({ nickname: values.nickname });
  const fetchExistEmail = useFetchExistEmail({ email: values.email });

  // 중복체크 disabled 함수
  const getExistCheckDisabled = (name: string, availabledName: string) => {
    // 1) 입력란에 값이 없는 경우
    // 2) 유효성검사에 통과되지 않은 값일 경우
    // 3) 중복확인을 받지 않은 값일 경우

    return !values[name] || !!errors[name] || !!values[availabledName];
  };

  // 중복체크 완료 후(사용가능 한 데이터 확인 완료 후), 데이터가 변경되면 available값 리셋
  const resetAvailabledValue = useCallback(
    (name: string) => {
      if (!values[name]) return;

      setFormValue(name, '');
    },
    [values.userId, values.nickname, values.email],
  );

  useEffect(() => {
    resetAvailabledValue('availabledNickname');
  }, [values.nickname]);

  useEffect(() => {
    resetAvailabledValue('availabledEmail');
  }, [values.email]);

  // 가입 완료 후 로직
  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    if (!isSuccess) return;

    const handleClickConfirm = () => {
      closeDialog();
      resetForm();
      window.location.reload();
    };

    openDialog(
      <Dialog header="수정 완료" footer={<S.Button onClick={handleClickConfirm}>확인</S.Button>}>
        정보가 성공적으로 수정되었습니다!
      </Dialog>,
    );
  }, [isSuccess]);

  // 기존 닉네임과 기존 이메일이 같을 시 중복체크 disable
  useEffect(() => {
    if (userInfo?.nickname && values.nickname === userInfo.nickname) {
      setFormValue('availabledNickname', '1');
    } else {
      setFormValue('availabledNickname', '');
    }
  }, [userInfo, values.nickname]);

  useEffect(() => {
    if (userInfo?.email && values.email === userInfo.email) {
      setFormValue('availabledEmail', '1');
    } else {
      setFormValue('availabledEmail', '');
    }
  }, [userInfo, values.email]);

  return (
    <S.Container $width={400}>
      <S.Title>개인정보</S.Title>

      <Form id="signup-form" onSubmit={handleSubmit}>
        <FormControl
          label="회원유형"
          htmlFor="userType"
          required
          error={<ErrorMessage touched={touched.userType} message={errors.userType} />}
        >
          <S.Row className="my-5" $justifyContent="space-around">
            <Radio id="userTypeAuthor" disabled {...getCheckProps('userType', UserTypeAuthor)}>
              예술가
            </Radio>
            <Radio id="userTypePlanner" disabled {...getCheckProps('userType', UserTypePlanner)}>
              기획자
            </Radio>
          </S.Row>
        </FormControl>

        <FormControl
          label="휴대폰번호"
          htmlFor="phone"
          required
          error={<ErrorMessage touched={touched.phone} message={errors.phone} />}
        >
          <S.Row>
            <S.Col>
              <S.Field id="phone" {...getFieldProps('phone')} type="text" placeholder="휴대폰번호" disabled />
            </S.Col>
          </S.Row>
        </FormControl>

        <div className="my-4">
          <Checkbox id="phoneSecret" {...getCheckProps('phoneSecret', '1')}>
            휴대폰번호 비공개
          </Checkbox>
        </div>

        <FormControl
          label="이름"
          htmlFor="name"
          required
          error={<ErrorMessage touched={touched.name} message={errors.name} />}
        >
          <S.Field id="name" {...getFieldProps('name')} type="text" placeholder="이름" disabled />
        </FormControl>

        <FormControl
          label="아이디"
          htmlFor="userId"
          required
          error={<ErrorMessage touched={touched.userId} message={errors.userId} />}
        >
          <S.Field
            id="userId"
            {...getFieldProps('userId')}
            type="text"
            placeholder="아이디"
            autoComplete="username"
            disabled
          />
        </FormControl>

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

        <FormControl
          label="비밀번호 확인"
          htmlFor="passwordCheck"
          required
          error={<ErrorMessage touched={touched.passwordCheck} message={errors.passwordCheck} />}
        >
          <S.Field
            id="passwordCheck"
            {...getFieldProps('passwordCheck')}
            type="password"
            placeholder="비밀번호 확인"
            autoComplete="new-password
"
          />
        </FormControl>

        <FormControl
          label="닉네임"
          htmlFor="nickname"
          required
          error={<ErrorMessage touched={touched.nickname} message={errors.nickname} />}
        >
          <ExistCheckForm
            fetchQuery={fetchExistNickname}
            label="닉네임"
            name="availabledNickname"
            onSuccess={setFormValue}
            disabled={getExistCheckDisabled('nickname', 'availabledNickname')}
          >
            <S.Field id="nickname" {...getFieldProps('nickname')} type="text" placeholder="닉네임" />
          </ExistCheckForm>
        </FormControl>

        <FormControl
          label="이메일"
          htmlFor="email"
          required
          error={<ErrorMessage touched={touched.email} message={errors.email} />}
        >
          <ExistCheckForm
            fetchQuery={fetchExistEmail}
            label="이메일"
            name="availabledEmail"
            onSuccess={setFormValue}
            disabled={getExistCheckDisabled('email', 'availabledEmail')}
          >
            <S.Field id="email" {...getFieldProps('email')} type="text" placeholder="이메일" />
          </ExistCheckForm>
        </FormControl>

        <div className="my-4">
          <Checkbox id="emailSecret" {...getCheckProps('emailSecret', '1')}>
            이메일 비공개
          </Checkbox>
        </div>

        <div className="mt-5">
          <S.Button type="submit" $block $size="large" disabled={isPending || isSuccess}>
            정보수정
          </S.Button>
        </div>
      </Form>
    </S.Container>
  );
};

export default InfoForm;
