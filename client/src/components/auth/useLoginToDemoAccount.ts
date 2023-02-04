import { useLogin } from 'common/hooks/useLogin';
import { useCallback } from 'react';

const useLoginToDemoAccount = () => {
  const { execute, isLoading, isSucceeded, error } = useLogin();
  const loginToDemoAccount = useCallback(() => {
    execute({ email: 'demo1@gmail.com', password: '123456' });
  }, [execute]);

  return { loginToDemoAccount, isLoading, isSucceeded, error };
};

export default useLoginToDemoAccount;
