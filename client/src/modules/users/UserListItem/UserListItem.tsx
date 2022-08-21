import IUser from 'interfaces/IUser';
import React from 'react';
import { Link } from 'react-router-dom';
import { userImageUrl } from 'services/api';
import UserFriendsActionsButton from 'modules/users/UserActions/UserFriendsActionsButton';

type UserListItemProps = {
  user: IUser;
};

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  return (
    <li>
      <div className='flex gap-2 items-center'>
        <div className='flex-shrink-0 rounded-full w-14 h-14 overflow-hidden'>
          <img className='w-full' src={userImageUrl(user._id)} alt='user profile' />
        </div>
        <Link to={`/profile/${user._id}`} className='hover:cursor-pointer'>
          <h6 className='font-bold leading-4 mb-1'>{user.fullName}</h6>
        </Link>
        <div className='ml-auto'>
          <UserFriendsActionsButton userId={user._id} />
        </div>
      </div>
    </li>
  );
};

export default UserListItem;
