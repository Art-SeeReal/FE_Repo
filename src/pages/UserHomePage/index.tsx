import React from 'react';

import { useParams } from 'react-router-dom';
import { useFetchUserType, useFetchUserProfile } from '../../hooks/query/useUserQuery';

const UserHomePage = () => {
  const params = useParams();
  const { data: userType } = useFetchUserType({ userId: params.userId || '' });
  const { data: userProfile } = useFetchUserProfile({ userId: params.userId || '' });

  console.log(userType, userProfile);

  return (
    <>
      <header>
        <p>닉네임 : {userProfile?.nickname}</p>
        {userProfile?.email && <p>이메일 : {userProfile?.email}</p>}
        {userProfile?.phone && <p>연락처 : {userProfile?.phone}</p>}
      </header>
      <article>
        <h2>소개</h2>
        {userProfile?.intro && userProfile?.intro}
      </article>
    </>
  );
};

export default UserHomePage;
