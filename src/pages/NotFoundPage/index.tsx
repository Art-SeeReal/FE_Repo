import React from 'react';
import ErrorLayout from '../../layout/ErrorLayout';

const NotFoundPage = () => {
  return <ErrorLayout errorCode={404} />;
};

export default NotFoundPage;
