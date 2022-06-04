import { emailRegex, modalNames } from 'common/constansts';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import ModalWrapper from 'components/ModalWrapper';
import { NotificationTypesEnum } from 'components/Notification';
import React, { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from 'store/auth/authSlice';
import { getCurrentUser } from 'store/selectors/appSelectors';
import { isModalOpenSelector } from 'store/selectors/uiSelectors';
import { closeModalAction, showNotification } from 'store/ui/uiSlice';
import { useUpdateUser } from './apiClient';

type FormType = {
  fullName: string;
  email: string;
};

const EditProfileModal = () => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const isModalOpen = useSelector(isModalOpenSelector(modalNames.editProfile));
  const currentUser = useSelector(getCurrentUser);

  const { execute: updateUser, isLoading, isSucceeded, data } = useUpdateUser();

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalAction(modalNames.editProfile));
  };

  useEffect(() => {
    if (!isSucceeded) return;
    dispatch(
      showNotification({
        text: 'Update succeeded!',
        type: NotificationTypesEnum.success,
        autoDismiss: 2000,
      }),
    );
    dispatch(updateCurrentUser(data));
  }, [data, dispatch, isSucceeded]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      fullName: currentUser.fullName,
      email: currentUser.email,
    },
  });

  const onSubmit = useCallback(
    (data: FormType) => {
      updateUser(data);
    },
    [updateUser],
  );

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      modalContentRef={modalContentRef}
      closeModal={closeModal}
    >
      <div ref={modalContentRef} className='bg-dark rounded-3xl p-5  px-7 w-full max-w-[585px]'>
        <h1 className='text-4xl font-black text-center py-4 mb-3'>Edit</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7'>
          <Input
            {...register('fullName', {
              required: 'Full name is required',
              minLength: 4,
              maxLength: 20,
            })}
            className='!bg-primary !text-white'
            placeholder='Full name...'
            error={errors.fullName?.message}
          />
          <Input
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: emailRegex,
                message: 'Please enter a valid email',
              },
            })}
            error={errors.email?.message}
            className='!bg-primary !text-white'
            placeholder='Email...'
          />
          <div className='flex gap-3 py-8'>
            <Button
              type='button'
              disabled={isLoading}
              className='flex-1 !bg-[#313134] text-xl !p-3'
              onClick={() => {
                dispatch(closeModalAction(modalNames.editProfile));
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type='submit'
              className='flex-1 !bg-[#5258ED] text-xl !p-3'
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditProfileModal;
