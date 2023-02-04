import { UserOnLoginType } from 'components/auth/LoginForm';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { post } from 'services/api';
import { loginSucces } from 'store/auth/authSlice';
import { useAppDispatch } from 'store/store';
import useApiLoadingTime from './useApiLoadingTime';
import useAsyncFunction from './useAsyncFunction';

export const useLogin = () => {
  const login = useLoginApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (login.isSucceeded && login.data) {
      const {
        data: { token, user },
      } = login.data;
      login.reset();
      localStorage.setItem('social-dive-token', token);
      dispatch(loginSucces({ token, user }));
      navigate('/');
    }
  }, [dispatch, login, navigate]);

  useApiLoadingTime({ isLoading: login.isLoading, isSucceeded: login.isSucceeded });

  return login;
};

export const useLoginApi = () => {
  const login = useCallback((user: UserOnLoginType) => {
    return post('/auth/login', user);
  }, []);

  return useAsyncFunction<any>(login);
};
