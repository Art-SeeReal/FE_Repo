// import React, { useState, useEffect } from 'react';
// import { useForm, IData } from '../../hooks/customs/useFormState';
// import Form from '../../components/Form';
// import ErrorMessage from '../../components/ErrorMessage';
// import { useToast } from '../../hooks/customs/useToastState';
// import * as S from '../../components/styles';
// import { useFindPwQuery } from '../../hooks/query/userQueries';
// import FormControl from '../../components/FormControl';
// import { isValidValue } from '../../utils/validation';

// const FindPw = () => {
//   const initialValue = { userName: '', userId: '', userEmail: '' };
//   const [formPwData, setFormPwData] = useState({
//     name: '',
//     id: '',
//     email: '',
//   });
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const { refetch, isSuccess } = useFindPwQuery({
//     name: formPwData.name,
//     id: formPwData.id,
//     email: formPwData.email,
//   });
//   const onSubmit = (values: IData<string>) => {
//     setFormPwData({ name: values.userName, id: values.userId, email: values.userEmail });
//     setFormSubmitted(true);
//   };

//   const validate = (values: IData<string>) => {
//     const errors: IData<string> = {};

//     if (!isValidValue(values.userName)) {
//       errors.userName = '이름을 입력하세요.';
//     }

//     if (!isValidValue(values.userId)) {
//       errors.userId = '아이디를 입력하세요.';
//     }

//     if (!isValidValue(values.userEmail)) {
//       errors.userEmail = '이메일을 입력하세요.';
//     }

//     return errors;
//   };

//   const { errors, touched, getFieldProps, handleSubmit, resetForm } = useForm({
//     initialValue,
//     validate,
//     onSubmit,
//   });
//   const { appendToast } = useToast();

//   useEffect(() => {
//     if (formSubmitted && formPwData) {
//       refetch();
//     }
//   }, [formSubmitted, formPwData]);

//   useEffect(() => {
//     if (!isSuccess) return;
//     resetForm();
//     appendToast({ content: '작성 완료', type: 'success' });
//   }, [isSuccess]);

//   return (
//     <>
//       <S.Title>비밀번호 찾기</S.Title>
//       <Form id="find-pw" onSubmit={handleSubmit}>
//         <FormControl
//           label="이름"
//           htmlFor="userName"
//           required
//           error={<ErrorMessage touched={touched.userName} message={errors.userName} />}
//         >
//           <S.Field id="userName" {...getFieldProps('userName')} type="text" placeholder="이름" />
//         </FormControl>
//         <FormControl
//           label="아이디"
//           htmlFor="userId"
//           required
//           error={<ErrorMessage touched={touched.userId} message={errors.userId} />}
//         >
//           <S.Field id="userId" {...getFieldProps('userId')} type="text" placeholder="아이디" />
//         </FormControl>
//         <FormControl
//           label="이메일"
//           htmlFor="userEmail"
//           required
//           error={<ErrorMessage touched={touched.userEmail} message={errors.userEmail} />}
//         >
//           <S.Field id="userEmail" {...getFieldProps('userEmail')} type="email" placeholder="이메일" />
//         </FormControl>
//         <S.Button type="submit">찾기</S.Button>
//       </Form>
//     </>
//   );
// };

// export default FindPw;

export default {};
