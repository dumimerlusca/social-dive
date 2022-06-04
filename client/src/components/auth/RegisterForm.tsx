import { useRef } from 'react';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import useClickOutside from 'common/hooks/useClickOutside';
import { registerUserAction } from 'store/auth/authActions';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { emailRegex } from 'common/constansts';

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

  return (
    <form
      ref={formRef}
      className='mt-7 flex flex-col gap-5 w-full max-w-md'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          className={classNames(
            errors.fullName && 'border border-red-500 focus:ring-red-500 focus:ring-2',
          )}
          placeholder='Full name...'
          {...register('fullName', {
            required: 'Full name required',
            minLength: 4,
            maxLength: 20,
          })}
        />
        <p className='text-red-500 mt-3 ml-5'>{errors.fullName?.message} </p>
      </div>
      <div>
        <Input
          placeholder='Email...'
          className={classNames(
            errors.email && 'border border-red-500 focus:ring-red-500 focus:ring-2',
          )}
          {...register('email', {
            required: 'Email required',
            pattern: {
              value: emailRegex,
              message: 'Please enter a valid email',
            },
          })}
        />
        <p className='text-red-500 mt-3 ml-5'>{errors.email?.message} </p>
      </div>
      <div>
        <Input
          placeholder='Password...'
          type='password'
          className={classNames(
            errors.password && 'border border-red-500 focus:ring-red-500 focus:ring-2',
          )}
          {...register('password', {
            required: 'Password required',
            minLength: {
              value: 6,
              message: "Password can't have less than 4 characters",
            },
            maxLength: {
              value: 16,
              message: "Password can' have more than 16 characters",
            },
          })}
        />
        <p className='text-red-500 mt-3 ml-5'>{errors.password?.message} </p>
      </div>
      {registerSuccess && (
        <p className='p-1 text-green-300'>Account created successfuly, you can log in now!</p>
      )}
      {error && <p className='p-1 text-red-500'>{error}</p>}
      <Button className='w-full mt-5' color='secondary'>
        {isLoading ? 'Loading...' : 'Create account'}
      </Button>
    </form>
  );
};

export default RegisterForm;
