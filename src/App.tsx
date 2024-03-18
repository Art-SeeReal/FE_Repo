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
import RegisterArtistPage from './pages/ArtistPage/RegisterPage';
import ArtistPage from './pages/ArtistPage';
import { Interceptor } from './utils/api';
import ArtistDetailPage from './pages/ArtistPage/DetialPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifyPage from './pages/ArtistPage/ModifyPage';

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
              <Route path="/artist">
                <Route index element={<ArtistPage />} />
                <Route path="register" element={<RegisterArtistPage />} />
                <Route path=":id" element={<ArtistDetailPage />} />
                <Route path="update/:id" element={<ModifyPage />} />
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
