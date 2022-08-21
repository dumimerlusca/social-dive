import React from 'react';
import { useGetPeopleYouMightKnow } from 'modules/users/apiClient';
import UserListItem from 'modules/users/UserListItem/UserListItem';
import Button from 'components/Button/Button';

const PeopleYouMightKnow = () => {
  const { data: users = [], isLoading, error } = useGetPeopleYouMightKnow();

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
      <Button className='m-auto block w-full mt-4' color='secondary'>
        Show More
      </Button>
    </div>
  );
};

export default PeopleYouMightKnow;
