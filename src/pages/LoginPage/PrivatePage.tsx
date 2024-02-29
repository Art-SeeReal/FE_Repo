// PrivatePage.js
import React from 'react';
import { useRecoilValue } from 'recoil';
import { IsUserLoggedInSelector } from '../../recoil/selectors/userSelectors';

const PrivatePage = () => {
  const isUserLoggedIn = useRecoilValue(IsUserLoggedInSelector);

  if (!isUserLoggedIn) {
    return <p>Please log in to access this page.</p>;
  }

  return (
    <div>
      <h2>Welcome to the Private Page!</h2>
    </div>
  );
};

export default PrivatePage;
