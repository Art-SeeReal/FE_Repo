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
import { DialogContainer } from './hooks/customs/useDialogState';
import ToastList from './components/ToastList';
import { Interceptor } from './utils/api';
import PortfolioRegisterPage from './pages/PortfolioRegisterPage';
import PortfoilioPage from './pages/PortfolioPage';
import PortfolioDetailPage from './pages/PortfolioDetialPage';
import PortfolioModifyPage from './pages/PortfolioModifyPage';
import RecruitsPage from './pages/RecruitsPage';
import RecruitsDetailPage from './pages/RecruitsDetailPage';
import RecruitsRegisterPage from './pages/RecruitsRegisterPage';
import RecruitsModifyPage from './pages/RecruitsModifyPage';
import ScrollToTop from './components/ScrollTop';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Interceptor>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/join" element={<SignupPage />} />
              <Route path="/agree" element={<ConsentPage />} />
              <Route path="/find-id-pw" element={<FindIdPwPage />} />
              <Route path="/portfolio">
                <Route index element={<PortfoilioPage />} />
                <Route path="register" element={<PortfolioRegisterPage />} />
                <Route path=":id" element={<PortfolioDetailPage />} />
                <Route path="update/:id" element={<PortfolioModifyPage />} />
              </Route>
              <Route path="recruits">
                <Route index element={<RecruitsPage />} />
                <Route path="register" element={<RecruitsRegisterPage />} />
                <Route path=":id" element={<RecruitsDetailPage />} />
                <Route path="update/:id" element={<RecruitsModifyPage />} />
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
