import { formatDate } from 'helpers/helpers';
import React from 'react';
import { Link } from 'react-router-dom';
import { userImageUrl } from 'services/api';
import IUser from '../../../interfaces/IUser';

interface PropTypes {
  user: IUser;
}

const FriendsListItem: React.FC<PropTypes> = ({ user }) => {
  return (
    <li>
      <Link to={`/profile/${user._id}`}>
        <div className='flex gap-2 items-center'>
          <div className='rounded-full w-12 h-12 overflow-hidden flex-shrink-0'>
            <img
              className='w-full h-full object-fill'
              src={userImageUrl(user._id)}
              alt='user profile'
            />
          </div>
          <div>
            <h6 className='font-bold leading-4 mb-1'>{user.fullName}</h6>
          </div>
          {user.isActive ? (
            <div className='ml-auto bg-yellow-300 rounded-full w-4 h-4 self-center flex-shrink-0'></div>
          ) : (
            <div className='ml-auto self-center'>{formatDate(new Date(user.lastActive))}</div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default FriendsListItem;
