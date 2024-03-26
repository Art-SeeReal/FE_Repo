import React from 'react';
import { RecoilRoot } from 'recoil';
import { DialogContainer } from './hooks/customs/useDialogState';
import ToastList from './components/ToastList';
import { Interceptor } from './utils/api';
import Router from './router';
import ScrollToTop from './components/ScrollTop';

const App = () => {
  return (
    <RecoilRoot>
      <Interceptor>
        <ScrollToTop />
        <Router />
        <DialogContainer />
        <ToastList />
      </Interceptor>
    </RecoilRoot>
  );
};

export default App;
