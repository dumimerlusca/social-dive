import { emailRegex, modalNames } from 'common/constansts';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import ModalWrapper from 'components/ModalWrapper';
import { NotificationTypesEnum } from 'components/Notification';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userImageUrl } from 'services/api';
import { updateCurrentUser } from 'store/auth/authSlice';
import { getCurrentUser } from 'store/selectors/appSelectors';
import { isModalOpenSelector } from 'store/selectors/uiSelectors';
import { closeModalAction, showNotification } from 'store/ui/uiSlice';
import { useUpdateUser, useUploadUserProfilePhoto } from './apiClient';

type FormType = {
  fullName: string;
  email: string;
};

const EditProfileModal = () => {
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const imagePreviewRef = useRef<HTMLImageElement>(null);

  const modalContentRef = useRef<HTMLDivElement>(null);
  const isModalOpen = useSelector(isModalOpenSelector(modalNames.editProfile));
  const currentUser = useSelector(getCurrentUser);

  const { execute: updateUser, isLoading, isSucceeded, data } = useUpdateUser();
  const { execute: uploadUserPhoto } = useUploadUserProfilePhoto();

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalAction(modalNames.editProfile));
  };

  useEffect(() => {
    if (!isSucceeded) return;
    dispatch(closeModalAction(modalNames.editProfile));
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
      if (!photo) return;
      const formData = new FormData();
      formData.append('photo', photo);
      uploadUserPhoto(formData);
    },
    [photo, updateUser, uploadUserPhoto],
  );

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      modalContentRef={modalContentRef}
      closeModal={closeModal}
    >
      <div ref={modalContentRef} className='bg-dark rounded-3xl p-5  px-7 w-full max-w-[585px]'>
        <h1 className='text-4xl font-black text-center py-4 mb-3'>Edit</h1>
        <div></div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7'>
          <div className='flex gap-3 items-center'>
            <img
              ref={imagePreviewRef}
              className='rounded-full w-40 h-40'
              src={userImageUrl(currentUser._id)}
              alt='avatar'
            />
            <div>
              <input
                onChange={(e) => {
                  if (!e.target.files || !e.target.files[0] || !imagePreviewRef.current) return;
                  const file = e.target.files[0];
                  imagePreviewRef.current.src = URL.createObjectURL(file);
                  setPhoto(file);
                }}
                type='file'
              />
              <p className='p-3 font-light text-sm'>
                *You will need to refresh the page in order to see the new profile photo
              </p>
            </div>
          </div>
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
