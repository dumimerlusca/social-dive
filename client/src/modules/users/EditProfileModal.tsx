import { useTranslate } from '@tolgee/react';
import { emailRegex, modalNames, queryKeys } from 'common/constansts';
import useAddNotification from 'common/hooks/useAddNotification';
import Button from 'components/Button/Button';
import Input, { InputErrorMessage } from 'components/Input/Input';
import ModalWrapper from 'components/ModalWrapper';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { userImageUrl } from 'services/api';
import { getErrorMessage } from 'store/auth/authActions';
import { updateCurrentUser } from 'store/auth/authSlice';
import { getCurrentUser } from 'store/selectors/appSelectors';
import { isModalOpenSelector } from 'store/selectors/uiSelectors';
import { closeModalAction } from 'store/ui/uiSlice';
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

  const updateUser = useUpdateUser();
  const { execute: uploadUserPhoto, isSucceeded: uploadPhotoSucceeded } =
    useUploadUserProfilePhoto();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { showSuccessNotification } = useAddNotification();

  const closeModal = () => {
    dispatch(closeModalAction(modalNames.editProfile));
  };

  useEffect(() => {
    if (!updateUser.isSucceeded) return;
    updateUser.resetSucceeded();
    queryClient.invalidateQueries(queryKeys.user(currentUser._id));
    dispatch(closeModalAction(modalNames.editProfile));
    showSuccessNotification('Update succeeded!');
    dispatch(updateCurrentUser(updateUser.data));
  }, [currentUser._id, dispatch, queryClient, showSuccessNotification, updateUser]);

  useEffect(() => {
    if (uploadPhotoSucceeded) {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }, [uploadPhotoSucceeded]);

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
      updateUser.execute(data);
      if (!photo) return;
      const formData = new FormData();
      formData.append('photo', photo);
      uploadUserPhoto(formData);
    },
    [photo, updateUser, uploadUserPhoto],
  );

  const t = useTranslate();

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      modalContentRef={modalContentRef}
      closeModal={closeModal}
    >
      <div ref={modalContentRef} className='bg-dark rounded-3xl p-5  px-7 w-full max-w-[585px]'>
        <h1 className='text-4xl font-black text-center py-4 mb-3'>{t('labels.edit')}</h1>
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
          {updateUser.error && <InputErrorMessage message={getErrorMessage(updateUser.error)} />}
          <div className='flex gap-3 py-8'>
            <Button
              type='button'
              disabled={updateUser.isLoading}
              className='flex-1 !bg-[#313134] text-xl !p-3'
              onClick={() => {
                dispatch(closeModalAction(modalNames.editProfile));
              }}
            >
              {t('labels.cancel')}
            </Button>
            <Button
              disabled={updateUser.isLoading}
              type='submit'
              className='flex-1 !bg-[#5258ED] text-xl !p-3'
            >
              {t('labels.submit')}
            </Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditProfileModal;
