import { useTranslate } from '@tolgee/react';
import Button from 'components/Button/Button';
import { NotificationTypesEnum } from 'components/Notification';
import { truncateString } from 'helpers/helpers';
import { useCreatePost } from 'modules/posts/apiClient';
import { useCallback, useEffect, useState } from 'react';
import { IoMdImages } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { showNotification } from 'store/ui/uiSlice';
import useNewsfeedContext from '../context/newsfeedContext';

interface IValues {
  description: string;
  image: File | undefined;
}

const NewPost = () => {
  const [values, setValues] = useState<IValues>({
    description: '',
    image: undefined,
  });
  const [imageName, setImageName] = useState('');
  const { onCreatePostSucceeded } = useNewsfeedContext();
  const { execute: createPost, isLoading, data: newPost, isSucceeded } = useCreatePost();

  const dispatch = useDispatch();
  const t = useTranslate();

  const resetFormValues = useCallback(() => {
    setValues({ description: '', image: undefined });
    setImageName('');
  }, []);

  useEffect(() => {
    if (!isSucceeded || !newPost) return;
    onCreatePostSucceeded(newPost);
    dispatch(
      showNotification({
        text: t('notifications.postCreatedSuccessfully'),
        type: NotificationTypesEnum.success,
        autoDismiss: 2000,
      }),
    );
    resetFormValues();
  }, [dispatch, isSucceeded, newPost, onCreatePostSucceeded, resetFormValues, t]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const { description, image } = values;

    if (!description && !image) return;

    const formData = new FormData();
    if (description) formData.append('description', values.description);
    if (image) formData.append('photo', image);
    createPost(formData);
  };

  const onChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImageName(e.target.files[0]?.name);
      setValues((prev) => ({ ...prev, image: e.target.files[0] }));
      return;
    }
    if (e.target.name === 'description')
      setValues((prev) => ({ ...prev, description: e.target.value }));
  };

  return (
    <form id='new-post-form' onSubmit={onSubmit} className='mb-24'>
      <h1 className='text-3xl mb-5 ml-5'>{t('newsfeed.updateYourActivity')}</h1>
      <textarea
        onChange={onChange}
        value={values.description}
        className='w-full bg-primary p-5 rounded-xl'
        placeholder={t('newPost.placeholder')}
        name='description'
        id='description'
        rows={5}
      ></textarea>
      <div className='flex gap-5 mt-3'>
        <div className='flex-1'>
          <label
            className='flex items-center px-3 justify-center w-full rounded-2xl hover:opacity-80 bg-primary text-center py-4 m-auto'
            htmlFor='image'
          >
            <IoMdImages className='text-3xl mr-5 text-yellow-200 flex-shrink-0' />
            <p className='text-xl truncate whitespace-nowrap'>
              {imageName ? truncateString(imageName, 10) : t('newPost.pictureButton')}
            </p>
          </label>
          <input
            onChange={onChange}
            className='absolute opacity-0 w-0'
            type='file'
            accept='image/png, image/jpeg'
            id='image'
            name='image'
          ></input>
        </div>
        <Button className='flex-1 truncate' color='secondary'>
          {isLoading ? t('labels.loading') : t('labels.submit')}
        </Button>
      </div>
    </form>
  );
};

export default NewPost;
