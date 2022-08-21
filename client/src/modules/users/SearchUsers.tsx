import Tippy from '@tippyjs/react';
import IUser from 'interfaces/IUser';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { userImageUrl } from 'services/api';
import { useGetUsers } from './apiClient';
import './SearchUsers.scss';

const SearchUsers = () => {
  const [search, setSearch] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { data: users = [] } = useGetUsers(search === '' ? null : search);

  const inputRef = useRef<HTMLInputElement>(null);
  console.log(users);

  const hideDropdown = useCallback(() => {
    setIsDropdownVisible(false);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    if (search === '') {
      hideDropdown();
    } else {
      setIsDropdownVisible(true);
    }
  }, [hideDropdown, search]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className='search-users-form flex-grow relative max-w-xl'
    >
      <Tippy
        interactive={true}
        visible={isDropdownVisible}
        theme='transparent'
        appendTo='parent'
        placement='bottom'
        onClickOutside={() => {
          hideDropdown();
        }}
        className='w-full'
        maxWidth='none'
        content={<DropdownContent hideDropdown={hideDropdown} users={users} />}
      >
        <input
          ref={inputRef}
          onChange={handleChange}
          value={search}
          onFocus={() => {
            if (!search) return;
            setIsDropdownVisible(true);
          }}
          className='bg-transparent text-xl w-full p-1 rounded-md appearance-none focus:ring-1 ring-secondary outline-none'
          placeholder='Search for users..'
        />
      </Tippy>
    </form>
  );
};

export default SearchUsers;
type DropdownContentProps = {
  users: IUser[];
  hideDropdown: () => void;
};

const DropdownContent: React.FC<DropdownContentProps> = ({ users, hideDropdown }) => {
  return (
    <div
      className='bg-primary-darker rounded-md
     text-white p-5 max-h-[300px] overflow-auto shadow-sm shadow-primary'
    >
      {users.length === 0 && <p>No results found</p>}
      <ul className='space-y-3'>
        {users.map((user) => (
          <UserItem key={user._id} user={user} hideDropdown={hideDropdown} />
        ))}
      </ul>
    </div>
  );
};

const UserItem = ({ user, hideDropdown }: { user: IUser; hideDropdown: () => void }) => {
  const navigate = useNavigate();

  return (
    <div
      className='flex items-center cursor-pointer'
      onClick={() => {
        hideDropdown();
        navigate(`/profile/${user._id}`);
      }}
    >
      <img className='w-8 h-8' src={userImageUrl(user._id)} alt='profile' />
      <p>{user.fullName}</p>
    </div>
  );
};
