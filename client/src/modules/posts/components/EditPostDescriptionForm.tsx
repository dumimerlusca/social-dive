import Button from 'components/Button/Button';
import IPost from 'interfaces/IPost';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useEditPost } from '../apiClient';

const EditPostDescriptionForm = ({
  description,
  postId,
  onSuccess,
}: {
  description: string;
  postId: string;
  onSuccess: (updatedPost: IPost) => void;
}) => {
  const { register, handleSubmit } = useForm({ defaultValues: { description } });
  const editPost = useEditPost();

  const onSubmit = useCallback(
    (values: any) => {
      editPost.execute(postId, values);
    },
    [editPost, postId],
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editPost.isSucceeded && editPost.data) {
      onSuccess(editPost.data);
    }
  }, [editPost.data, editPost.isSucceeded, onSuccess, queryClient]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('description')} className='bg-dark/50 block w-full p-3 rounded-2xl' />
      <Button
        type={editPost.isLoading ? 'button' : 'submit'}
        disabled={editPost.isLoading}
        className='my-3'
        color='secondary'
      >
        Save
      </Button>
    </form>
  );
};

export default EditPostDescriptionForm;
