import React, { useEffect, useState } from 'react';
import { useGetPeopleYouMightKnow } from 'modules/users/apiClient';
import UserListItem from 'modules/users/UserListItem/UserListItem';
import Button from 'components/Button/Button';
import { loadUserLoading } from 'store/auth/authSlice';
import IUser from 'interfaces/IUser';
import Tippy from '@tippyjs/react';

const DEFAULT_LIMIT = 5;

const PeopleYouMightKnow = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);

  const { data: newUsers = [], isLoading, error } = useGetPeopleYouMightKnow(page, DEFAULT_LIMIT);

  const hasMore = newUsers.length !== 0;

  useEffect(() => {
    setUsers((prevUsers) => {
      const newUsersTemp = newUsers.filter((newUser) => {
        const isAlredy = prevUsers.find((prevUser) => prevUser._id === newUser._id);
        if (isAlredy) return false;
        return true;
      });
      return prevUsers.concat(newUsersTemp);
    });
  }, [newUsers]);

  return (
    <div className='bg-primary rounded-3xl p-5 flex flex-col h-full'>
      <h1 className='text-3xl mb-3'>People you might know</h1>
      <div className='grow overflow-auto'>
        <ul>
          {users.map((user) => {
            return <UserListItem key={user._id} user={user} />;
          })}
        </ul>
      </div>
      <Tippy disabled={false} content='No more people to show'>
        <div>
          <Button
            className='m-auto block w-full mt-4'
            color='secondary'
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            disabled={isLoading || !hasMore}
          >
            {isLoading ? 'Loading...' : 'Show More'}
          </Button>
        </div>
      </Tippy>
    </div>
  );
};

export default PeopleYouMightKnow;
