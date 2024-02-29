import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { Route, Routes } from 'react-router-dom';
import Applayout from './layout/Applayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import FindIdPwPage from './pages/FindIdPwPage';
import SignupPage from './pages/SignupPage';
import ConsentPage from './pages/ConsentPage';
import TestPage from './pages/TestPage';
import SecondPage from './pages/SecondPage';
import PrivatePage from './pages/LoginPage/PrivatePage';
import ArtistPage from './pages/ArtistPage';
import { DialogContainer } from './hooks/useDialogState';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Applayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<SignupPage />} />
            <Route path="/agree" element={<ConsentPage />} />
            <Route path="/artist">
              <Route index element={<ArtistPage />} />
            </Route>
            <Route path="/test" element={<TestPage />} />
            <Route path="/second" element={<SecondPage />} />
            <Route path="/findIdPw" element={<FindIdPwPage />} />
            <Route path="/private" element={<PrivatePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

        <DialogContainer />
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
