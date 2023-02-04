import PrivateRoute from 'components/routes/PrivateRoute';
import ChatPage from 'pages/ChatPage';
import GamesPage from 'pages/GamesPage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import SinglePostPage from 'pages/SinglePostPage';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute element={<MainPage />} />} />
      <Route path='/profile/:userId' element={<PrivateRoute element={<ProfilePage />} />} />
      <Route path='/posts/:postId' element={<PrivateRoute element={<SinglePostPage />} />} />
      <Route path='/chat' element={<PrivateRoute element={<ChatPage />} />} />
      <Route path='/games' element={<PrivateRoute element={<GamesPage />} />} />

      <Route path='/home' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
