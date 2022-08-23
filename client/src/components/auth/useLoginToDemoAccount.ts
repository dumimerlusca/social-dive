import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAction } from 'store/auth/authActions';
import { useAppSelector } from 'store/store';

const useLoginToDemoAccount = () => {
  const dispatch = useDispatch();
  const { error, isLoading, isLoggedIn } = useAppSelector((state) => state.auth);
  const loginToDemoAccount = useCallback(() => {
    dispatch(loginUserAction({ email: 'demo1@gmail.com', password: '123456' }));
  }, [dispatch]);
  return { loginToDemoAccount, isLoading, isLoggedIn, error };
};

export default useLoginToDemoAccount;
