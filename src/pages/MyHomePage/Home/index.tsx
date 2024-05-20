import React, { useEffect, useState } from 'react';
import { RiPhoneLine, RiMailLine } from '@remixicon/react';
import * as S from '../../../components/styles';
import Form from '../../../components/Form';
import ReactQuillForm from '../../../components/ReactQuillForm';
import FormControl from '../../../components/FormControl';
import { useForm, OnSubmitFn } from '../../../hooks/customs/useFormState';
import { useFetchProfile, useUpdateIntro } from '../../../hooks/query/useUserQuery';
import Tooltip from '../../../components/Tooltip';
import Modal from '../../../components/Modal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const { mutate: updateIntro, isSuccess } = useUpdateIntro();
  const { data: profileData } = useFetchProfile();
  const [initialValue, setInitialValue] = useState({ content: '' });
  const onSubmit: OnSubmitFn = ({ content }) => {
    updateIntro({ intro: content });
  };
  const { getQuillProps, handleSubmit } = useForm({
    initialValue,
    onSubmit,
  });

  useEffect(() => {
    if (profileData) {
      setInitialValue({ content: profileData.intro });
    }
  }, [profileData]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
    }
  }, [isSuccess]);
  return (
    <S.Container $width={800}>
      <S.Row>
        <S.Col style={{ display: 'flex', alignItems: 'center' }}>
          <S.Title $size="large" $bold style={{ margin: '0' }}>
            {profileData?.nickname}
          </S.Title>
          {profileData?.email && (
            <Tooltip message={profileData?.email ?? ''}>
              <RiMailLine />
            </Tooltip>
          )}
          {profileData?.phone && (
            <Tooltip message={profileData?.phone ?? ''}>
              <RiPhoneLine />
            </Tooltip>
          )}
        </S.Col>
        <S.Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <S.Button onClick={handleOpenModal}>작성하기</S.Button>
          {isModalOpen && (
            <Modal onClose={handleCloseModal}>
              <Form id="register-form" onSubmit={handleSubmit}>
                <FormControl label="내용" htmlFor="content" required>
                  <ReactQuillForm {...getQuillProps('content')} />
                </FormControl>
                <S.Row $justifyContent="flex-end">
                  <S.Button type="submit">수정하기</S.Button>
                </S.Row>
              </Form>
            </Modal>
          )}
        </S.Col>
      </S.Row>
      <S.Col style={{ margin: '50px 0px' }} dangerouslySetInnerHTML={{ __html: profileData?.intro ?? '' }} />
    </S.Container>
  );
};

export default Home;
