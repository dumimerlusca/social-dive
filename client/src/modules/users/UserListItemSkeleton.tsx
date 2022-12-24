import React from 'react';
import Skeleton from 'react-loading-skeleton';

const UserListItemSkeleton = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='w-12 h-12 rounded-full overflow-hidden'>
        <Skeleton className='h-full -translate-y-3 scale-150' />
      </div>
      <div className='grow h-5'>
        <Skeleton className='w-full h-full' />
      </div>
    </div>
  );
};

export default UserListItemSkeleton;
