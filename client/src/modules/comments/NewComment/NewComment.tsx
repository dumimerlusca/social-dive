import classNames from 'classnames';
import IComment from 'interfaces/IComment';
import { useAddComment } from 'modules/posts/apiClient';
import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_API_URL } from 'services/api';
import { getCurrentUserId } from 'store/selectors/appSelectors';

type NewCommentProps = {
  wrapperClassname?: string;
  postId: string;
  onAddCommentSucceeded: (newComment: IComment) => void;
};

const NewComment: React.FC<NewCommentProps> = ({
  wrapperClassname,
  postId,
  onAddCommentSucceeded,
}) => {
  const [text, setText] = useState('');

  const {
    execute: addComment,
    data: newComment,
    isSucceeded,
    resetSucceeded,
  } = useAddComment(postId, text);

  const currentUserId = useSelector(getCurrentUserId);

  const onChange = (e: any) => {
    setText(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addComment();
    setText('');
  };

  useEffect(() => {
    if (!isSucceeded || !newComment) return;
    resetSucceeded();
    onAddCommentSucceeded(newComment);
  }, [isSucceeded, newComment, onAddCommentSucceeded, resetSucceeded]);

  return (
    <form onSubmit={onSubmit} className={classNames(wrapperClassname)}>
      <div className='flex gap-3 items-center'>
        <img
          className='rounded-full h-8 w-8 flex-shrink-0'
          src={BASE_API_URL + `/users/${currentUserId}/photo`}
          alt=''
        />
        <input
          value={text}
          onChange={onChange}
          className='w-full py-2 px-4 rounded-md bg-[rgba(255,255,255,0.03)]'
          type='text'
          placeholder='Write a public comment'
        />
      </div>
    </form>
  );
};

export default NewComment;
