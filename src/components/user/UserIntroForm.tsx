// import React, { useState, useEffect } from 'react';
// import Form from '../Form';
// import FormControl from '../FormControl';
// import * as S from '../styles';
// import { useForm, IData } from '../../hooks/customs/useFormState';
// import { useUpdateIntro } from '../../hooks/useMyQuery';

// interface Props {
//   intro?: string;
//   onSuccess: () => void;
// }

// const UserIntroForm = ({ intro, onSuccess }: Props) => {
//   console.log('Render: ', intro);
//   const [isEdit, setIsEdit] = useState(false);
//   const [buttonStatus, setButtonStatus] = useState('편집');
//   const [isDisabledSubmitButton, setIsDisabledSubmitButton] = useState(true);

//   const { mutate: updateIntro, isSuccess } = useUpdateIntro();

//   const initialValue = {
//     intro: intro || '',
//   };

//   const onSubmit = (values: IData<string>) => {
//     updateIntro({ intro: values.intro });
//   };

//   const { values, getFieldProps, handleSubmit } = useForm({ initialValue, onSubmit });

//   const toggleEdit = () => setIsEdit(!isEdit);

//   useEffect(() => {
//     setButtonStatus(isEdit ? '취소' : '편집');
//   }, [isEdit]);

//   useEffect(() => {
//     if (isSuccess) {
//       setIsEdit(false);
//       onSuccess();
//       setIsDisabledSubmitButton(true);
//     }
//   }, [isSuccess]);

//   useEffect(() => {
//     console.log(values.intro, intro);
//     setIsDisabledSubmitButton(values.intro === intro);
//   }, [values.intro]);

//   return (
//     <Form id="form-user-intro" onSubmit={handleSubmit}>
//       <FormControl label="소개글" htmlFor="intro">
//         {isEdit ? (
//           <S.Field id="intro" {...getFieldProps('intro')} as="textarea" placeholder="소개글을 입력하세요." />
//         ) : (
//           intro
//         )}
//       </FormControl>

//       <S.Row $gap="1rem" $justifyContent="flex-end" className="mt-5">
//         <S.Button $size="small" onClick={toggleEdit} $border={isEdit}>
//           {buttonStatus}
//         </S.Button>
//         {isEdit && (
//           <S.Button type="submit" $size="small" disabled={isDisabledSubmitButton}>
//             저장
//           </S.Button>
//         )}
//       </S.Row>
//     </Form>
//   );
// };

// export default UserIntroForm;

export default {};
