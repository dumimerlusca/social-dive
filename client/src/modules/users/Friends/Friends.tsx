import { modalNames } from 'common/constansts';
import Button from 'components/Button/Button';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserId } from 'store/selectors/appSelectors';
import { openModalAction } from 'store/ui/uiSlice';
import { useGetUserFriends } from '../apiClient';
import FriendsListItem from './FriendsListItem';

const Friends = () => {
  const currentUserId = useSelector(getCurrentUserId);
  const dispatch = useDispatch();
  const { data: friends = [] } = useGetUserFriends(currentUserId);

  const hasFriends = friends.length !== 0;

  const sortedFriendsArr = useMemo(
    () =>
      friends
        .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
        .slice(0, 5),
    [friends],
  );

  return (
    <div className='p-5 bg-primary rounded-3xl flex flex-col h-full'>
      <h3 className='text-3xl mb-5'>Friends</h3>
      <div className='grow overflow-auto px-2'>
        {!hasFriends && <h3>You don't have any friends right now</h3>}
        <ul className='space-y-2'>
          {sortedFriendsArr.map((user) => {
            return <FriendsListItem key={user._id} user={user} />;
          })}
        </ul>
      </div>
      <div className='text-center'>
        <Button
          color='secondary'
          className='w-full'
          disabled={!hasFriends}
          onClick={() => {
            dispatch(openModalAction(modalNames.allFriends));
          }}
        >
          Show All
        </Button>
      </div>
    </div>
  );
};

export default Friends;
