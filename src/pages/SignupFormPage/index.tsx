import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import FormControl from '../../components/FormControl';
import ErrorMessage from '../../components/ErrorMessage';
import Dialog from '../../components/Dialog';
import Radio from '../../components/Radio';
import Checkbox from '../../components/Checkbox';
import ExistCheckForm from './ExistCheckForm';
import * as S from '../../components/styles';
import {
  useSignup,
  useFetchExistUserId,
  useFetchExistNickname,
  useFetchExistEmail,
} from '../../hooks/query/useUserQuery';
import { useForm, OnSubmitFn, ValidateFn } from '../../hooks/customs/useFormState';
import { useDialog } from '../../hooks/customs/useDialogState';
import {
  certPhoneErrorMessage,
  userIdErrorMessage,
  passwordErrorMessage,
  arePasswordsEqual,
  nicknameErrorMessage,
  emailErrorMessage,
  existCheckErrorMessage,
} from '../../utils/validation';
import { UserTypeAuthor, UserTypePlanner } from '../../utils/constants';

const SignupPage = () => {
  const initialValue = {
    name: '',
    phone: '',
    certedPhone: '', // 휴대폰번호 인증 완료 : '1', 미완 : ''
    phoneSecret: '',
    userId: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    email: '',
    emailSecret: '',
    userType: '',
    availabledUserId: '', // 아이디 중복체크 후 사용가능 값 확인 완료 : '1', 미완 : ''
    availabledNickname: '',
    availabledEmail: '',
  };

  const validate: ValidateFn = (values) => {
    const errors = {
      phone: certPhoneErrorMessage(values.certedPhone),
      userId: userIdErrorMessage(values.userId) || existCheckErrorMessage(values.availabledUserId, '아이디'),
      password: passwordErrorMessage(values.password),
      passwordCheck: arePasswordsEqual(values.password, values.passwordCheck) ? '' : '비밀번호가 일치하지 않습니다.',
      nickname: nicknameErrorMessage(values.nickname) || existCheckErrorMessage(values.availabledNickname, '닉네임'),
      email: emailErrorMessage(values.email) || existCheckErrorMessage(values.availabledEmail, '이메일'),
      userType: [UserTypeAuthor, UserTypePlanner].includes(values.userType) ? '' : '회원유형을 선택하세요.',
    };

    return errors;
  };

  const { mutate: signup, isPending, isSuccess } = useSignup();

  const onSubmit: OnSubmitFn = (values) => {
    const { userId, password, name, nickname, email, emailSecret, phone, phoneSecret, userType } = values;

    signup({
      userId,
      password,
      name,
      nickname,
      email,
      emailSecret: emailSecret === '1',
      phone,
      phoneSecret: phoneSecret === '1',
      userType,
    });
  };

  const { values, errors, touched, getCheckProps, getFieldProps, handleSubmit, resetForm, setFormValue } = useForm({
    initialValue,
    validate,
    onSubmit,
  });

  // TODO : 추후 휴대폰번호 Pass 인증 연동
  const handleClickCert = () => {
    setFormValue('certedPhone', '1');
    setFormValue('name', '아무개');
    setFormValue('phone', '01012345678');
  };

  // 중복확인 훅 Query Result
  const fetchExistUserId = useFetchExistUserId({ userId: values.userId });
  const fetchExistNickname = useFetchExistNickname({ nickname: values.nickname });
  const fetchExistEmail = useFetchExistEmail({ email: values.email });

  // 중복체크 disabled 함수
  const getExistCheckDisabled = (name: string, availabledName: string) => {
    // return !values[name] || !!values[availabledName] || !!errors[name];
    return !values[name] || !!values[availabledName];
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
    resetAvailabledValue('availabledUserId');
  }, [values.userId]);

  useEffect(() => {
    resetAvailabledValue('availabledNickname');
  }, [values.nickname]);

  useEffect(() => {
    resetAvailabledValue('availabledEmail');
  }, [values.email]);

  // 가입 완료 후 로직
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
      <Dialog header="가입 완료" footer={<S.Button onClick={handleClickConfirm}>로그인 페이지로</S.Button>}>
        {values.name}님 환영합니다!
        <br />
        회원가입이 완료되었습니다. 로그인 후 이용해 주세요.
      </Dialog>,
    );
  }, [isSuccess]);

  return (
    <S.Container $width={400}>
      <S.Title>회원가입</S.Title>

      <S.Description $size="small" className="mb-5">
        아트씨리얼에 오신 것을 환영합니다.
      </S.Description>

      <Form id="signup-form" onSubmit={handleSubmit}>
        <FormControl
          label="회원유형"
          htmlFor="userType"
          required
          error={<ErrorMessage touched={touched.userType} message={errors.userType} />}
        >
          <S.Description $size="xsmall">회원유형은 가입 후 변경할 수 없습니다.</S.Description>
          <S.Row className="my-5" $justifyContent="space-around">
            <Radio id="userTypeAuthor" {...getCheckProps('userType', UserTypeAuthor)}>
              예술가
            </Radio>
            <Radio id="userTypePlanner" {...getCheckProps('userType', UserTypePlanner)}>
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
          <S.Row $gap={10}>
            <S.Col>
              <S.Field id="phone" {...getFieldProps('phone')} type="text" placeholder="휴대폰번호" disabled />
            </S.Col>
            <S.Col $col={3}>
              <S.Button onClick={handleClickCert} $style="secondary" $block>
                본인 인증
              </S.Button>
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
          <ExistCheckForm
            fetchQuery={fetchExistUserId}
            label="아이디"
            name="availabledUserId"
            onSuccess={setFormValue}
            disabled={getExistCheckDisabled('userId', 'availabledUserId')}
          >
            <S.Field
              id="userId"
              {...getFieldProps('userId')}
              type="text"
              placeholder="아이디"
              autoComplete="username"
            />
          </ExistCheckForm>
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
            회원가입
          </S.Button>
        </div>
      </Form>
    </S.Container>
  );
};

export default SignupPage;
