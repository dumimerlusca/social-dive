import { useTranslate } from '@tolgee/react';
import classNames from 'classnames';
import useClickOutside from 'common/hooks/useClickOutside';
import { useLogin } from 'common/hooks/useLogin';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import { useCallback, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { getErrorMessage } from 'store/auth/authActions';
import useLoginToDemoAccount from './useLoginToDemoAccount';

export type UserOnLoginType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    loginToDemoAccount,
    isLoading: isLoadingLoginDemoAccount,
    error: loginDemoAccountError,
  } = useLoginToDemoAccount();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UserOnLoginType>();

  const onSubmit = useCallback(
    (data: { email: string; password: string }) => {
      login.execute(data);
    },
    [login],
  );

  useClickOutside(formRef, () => {
    clearErrors();
  });

  const t = useTranslate();

  const error = useMemo(
    () => login.error || loginDemoAccountError,
    [login.error, loginDemoAccountError],
  );
  const inProgress = useMemo(
    () => login.isLoading || isLoadingLoginDemoAccount,
    [isLoadingLoginDemoAccount, login.isLoading],
  );

  return (
    <form
      ref={formRef}
      className='mt-7 flex flex-col gap-5 w-full max-w-md'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          id='field-email'
          placeholder={t('form.placeholders.email')}
          className={classNames(
            errors.email && 'border border-red-500 focus:ring-red-500 focus:ring-2',
          )}
          {...register('email', {
            required: t('form.requiredField'),
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t('form.error.enterValidEmail'),
            },
          })}
        />
        <p className='text-red-500 mt-3 ml-5'>{errors.email?.message} </p>
      </div>
      <div>
        <Input
          id='field-password'
          placeholder={t('form.placeholders.password')}
          type='password'
          className={classNames(
            errors.password && 'border border-red-500 focus:ring-red-500 focus:ring-2',
          )}
          {...register('password', {
            required: t('form.requiredField'),
            minLength: {
              value: 6,
              message: t('passwordValidation.noLessThan4Char'),
            },
            maxLength: {
              value: 16,
              message: t('passwordValidation.noMoreThan16Char'),
            },
          })}
        />
        <p className='text-red-500 mt-3 ml-5'>{errors.password?.message} </p>
      </div>
      {error && <p className='p-1 text-red-500'>{getErrorMessage(error)}</p>}
      <Button type='submit' className='w-full mt-5' color='secondary'>
        {inProgress ? t('labels.loading') : t('labels.logIn')}
      </Button>
      <div>
        <button
          type='button'
          onClick={loginToDemoAccount}
          className='border-b pb-1 m-auto block grow-0'
        >
          {t('login.withDemoAccount')}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
