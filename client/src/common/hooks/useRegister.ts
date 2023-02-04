import { UserOnRegisterType } from 'components/auth/RegisterForm';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { post } from 'services/api';
import { registerSucces } from 'store/auth/authSlice';
import useAddNotification from './useAddNotification';
import useApiLoadingTime from './useApiLoadingTime';
import useAsyncFunction from './useAsyncFunction';

export const useRegister = () => {
  const register = useRegisterApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showSuccessNotification } = useAddNotification();

  useEffect(() => {
    if (register.isSucceeded && register.data) {
      const {
        data: { token, user },
      } = register.data;
      register.reset();
      localStorage.setItem('social-dive-token', token);
      showSuccessNotification('Account created successfully!');
      dispatch(registerSucces({ token, user }));
      navigate('/');
    }
  }, [dispatch, register, navigate, showSuccessNotification]);

  useApiLoadingTime({
    isLoading: register.isLoading,
    isSucceeded: register.isSucceeded,
    erorr: register.error,
  });

  return register;
};

export const useRegisterApi = () => {
  const register = useCallback((data: UserOnRegisterType) => {
    return post('/auth/register', data);
  }, []);
  return useAsyncFunction<any>(register);
};
