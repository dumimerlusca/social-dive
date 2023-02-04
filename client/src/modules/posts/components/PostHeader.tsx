import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import useIsCurrentUser from 'common/hooks/useIsCurrentUser';
import { formatDate } from 'helpers/helpers';
import IPost from 'interfaces/IPost';
import PostSettings from 'modules/posts/Newsfeed/PostSettings';
import React, { useCallback, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { userImageUrl } from 'services/api';

import './PostHeader.scss';

type PostHeaderProps = {
  wrapperClassName?: string;
  post: IPost;
  onClickEdit: () => void;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  post: { user, createdAt, _id },
  wrapperClassName,
  onClickEdit,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isPostOwner = useIsCurrentUser(user._id);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  return (
    <div className={classNames('post-header flex gap-4 items-center mb-3', wrapperClassName)}>
      <div className='w-14 h-14 overflow-hidden rounded-full'>
        <img className='w-full h-full object-cover' src={userImageUrl(user._id)} alt='profile' />
      </div>
      <div>
        <Link to={`/profile/${user._id}`}>
          <h6 className='text-xl font-semibold cursor-pointer'>{user.fullName}</h6>
        </Link>
        <p>{formatDate(new Date(createdAt))}</p>
      </div>
      {isPostOwner && (
        <Tippy
          content={
            <PostSettings closeDropdown={closeDropdown} onClickEdit={onClickEdit} postId={_id} />
          }
          theme='transparent'
          interactive
          visible={isDropdownOpen}
          onClickOutside={() => {
            setIsDropdownOpen(false);
          }}
          appendTo='parent'
        >
          <button
            data-test='newsfeed-post-settings-button'
            onClick={() => {
              setIsDropdownOpen((prev) => !prev);
            }}
            className='ml-auto'
          >
            <BsThreeDotsVertical className='text-3xl' />
          </button>
        </Tippy>
      )}
    </div>
  );
};

export default PostHeader;
