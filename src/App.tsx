import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import FindIdPwPage from './pages/FindIdPwPage';
import SignupPage from './pages/SignupPage';
import ConsentPage from './pages/ConsentPage';
import TestPage from './pages/TestPage';
import PrivatePage from './pages/LoginPage/PrivatePage';
import { DialogContainer } from './hooks/useDialogState';
import ToastList from './components/ToastList';
import RegisterPortfolioPage from './pages/PortfoliotPage/RegisterPage';
import Portfoilio from './pages/PortfoliotPage';
import { Interceptor } from './utils/api';
import DetailPortfolioPage from './pages/PortfoliotPage/DetialPage';
import ModifyPortfolioPage from './pages/PortfoliotPage/ModifyPage';
import Recruits from './pages/Recruits';
import DetailRecruitsPage from './pages/Recruits/DetailPage';
import RegisterRecruitsPage from './pages/Recruits/RegisterPage';
import ModifyRecruitsPage from './pages/Recruits/ModifyPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Interceptor>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/join" element={<SignupPage />} />
              <Route path="/agree" element={<ConsentPage />} />
              <Route path="/find-id-pw" element={<FindIdPwPage />} />
              <Route path="/portfolio">
                <Route index element={<Portfoilio />} />
                <Route path="register" element={<RegisterPortfolioPage />} />
                <Route path=":id" element={<DetailPortfolioPage />} />
                <Route path="update/:id" element={<ModifyPortfolioPage />} />
              </Route>
              <Route path="recruits">
                <Route index element={<Recruits />} />
                <Route path="register" element={<RegisterRecruitsPage />} />
                <Route path=":id" element={<DetailRecruitsPage />} />
                <Route path="update/:id" element={<ModifyRecruitsPage />} />
              </Route>
              <Route path="/test">
                <Route index element={<TestPage />} />
                <Route path="private" element={<PrivatePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <DialogContainer />
          <ToastList />
        </Interceptor>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
