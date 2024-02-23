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
import PrivatePage from './pages/LoginPage/PrivatePage';
import { DialogContainer } from './hooks/useDialogState';
import RegisterArtistPage from './pages/RegisterArtistPage';

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
            <Route path="/test" element={<TestPage />} />
            <Route path="/findIdPw" element={<FindIdPwPage />} />
            <Route path="/registerArtist" element={<RegisterArtistPage />} />
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
