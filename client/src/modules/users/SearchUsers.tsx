import Tippy from '@tippyjs/react';
import IUser from 'interfaces/IUser';
import React, { useCallback, useState } from 'react';
import { userImageUrl } from 'services/api';
import { useGetUsers } from './apiClient';
import './SearchUsers.scss';

const SearchUsers = () => {
  const [search, setSearch] = useState('');

  const { data: users = [] } = useGetUsers(search);

  console.log(users);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className='search-users-form flex-grow relative'
    >
      <Tippy
        interactive={true}
        trigger='click'
        theme='transparent'
        appendTo='parent'
        placement='bottom'
        className='w-full'
        maxWidth='none'
        content={<DropdownContent users={users} />}
      >
        <input
          onChange={handleChange}
          value={search}
          className='bg-transparent text-xl w-full'
          placeholder='Search..'
        />
      </Tippy>
    </form>
  );
};

export default SearchUsers;
type DropdownContentProps = {
  users: IUser[];
};

const DropdownContent: React.FC<DropdownContentProps> = ({ users }) => {
  return (
    <div
      className='bg-primary-lighter
     text-white p-5'
    >
      <ul className='space-y-3'>
        {users.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </ul>
    </div>
  );
};

const UserItem = ({ user }: { user: IUser }) => {
  return (
    <div className='flex'>
      <img className='w-6 h-6' src={userImageUrl(user._id)} alt='profile' />
      <p>{user.fullName}</p>
    </div>
  );
};
