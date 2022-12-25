import classNames from 'classnames';
import { useRef } from 'react';

import { useTranslate } from '@tolgee/react';
import { emailRegex } from 'common/constansts';
import useClickOutside from 'common/hooks/useClickOutside';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import { registerUserAction } from 'store/auth/authActions';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';

export type UserOnRegisterType = {
  fullName: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const { isLoading, registerSuccess, error } = useAppSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<UserOnRegisterType>();

  const onSubmit = (data: any) => {
    dispatch(registerUserAction(data));
  };

  useClickOutside(formRef, () => {
    clearErrors();
  });

  const t = useTranslate();

  return (
    <form
      ref={formRef}
      className='mt-7 flex flex-col gap-5 w-full max-w-md'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          error={errors.fullName?.message}
          className={classNames(
            errors.fullName && 'border border-red-500 focus:ring-red-500 focus:ring-2',
          )}
          placeholder={t('form.placeholders.fullName')}
          {...register('fullName', {
            required: t('form.requiredField'),
            minLength: 4,
            maxLength: 20,
          })}
        />
      </div>
      <div>
        <Input
          error={errors.email?.message}
          placeholder={t('form.placeholders.email')}
          className={classNames(
            errors.email && 'border border-red-500 focus:ring-red-500 focus:ring-2',
          )}
          {...register('email', {
            required: t('form.requiredField'),
            pattern: {
              value: emailRegex,
              message: t('form.error.enterValidEmail'),
            },
          })}
        />
      </div>
      <div>
        <Input
          error={errors.password?.message}
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
      </div>
      {registerSuccess && (
        <p className='p-1 text-green-300'>Account created successfuly, you can log in now!</p>
      )}
      {error && <p className='p-1 text-red-500'>{error}</p>}
      <Button className='w-full mt-5' color='secondary'>
        {isLoading ? t('labels.loading') : t('labels.createAccount')}
      </Button>
    </form>
  );
};

export default RegisterForm;
