import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import SinglePostPage from 'pages/SinglePostPage';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import PrivateRoute from 'components/routes/PrivateRoute';
import ChatPage from 'pages/ChatPage';
import useWindowWidth from 'common/hooks/useWindowWidth';
import Notification from 'components/Notification';

function App() {
  useWindowWidth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute element={<MainPage />} />} />
          <Route path='/profile/:userId' element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path='/posts/:postId' element={<PrivateRoute element={<SinglePostPage />} />} />
          <Route path='/chat' element={<PrivateRoute element={<ChatPage />} />} />

          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
      <Notification />
    </>
  );
}

export default App;
