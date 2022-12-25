import { useTranslate } from '@tolgee/react';
import { modalNames } from 'common/constansts';
import Button from 'components/Button/Button';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserId } from 'store/selectors/appSelectors';
import { openModalAction } from 'store/ui/uiSlice';
import { useGetUserFriends } from '../apiClient';
import UserListItemSkeleton from '../UserListItemSkeleton';
import FriendsListItem from './FriendsListItem';

const Friends = () => {
  const currentUserId = useSelector(getCurrentUserId);
  const dispatch = useDispatch();
  const { data: friends = [], isLoading } = useGetUserFriends(currentUserId);

  const hasFriends = friends.length !== 0;

  const sortedFriendsArr = useMemo(
    () =>
      friends
        .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
        .slice(0, 5),
    [friends],
  );

  const t = useTranslate();

  return (
    <div className='p-5 bg-primary rounded-3xl flex flex-col h-full'>
      <h3 className='text-3xl mb-5'>{t('friends.title')}</h3>
      <div className='grow overflow-auto px-2'>
        {!hasFriends && !isLoading && <h3>{t('friends.noFriendsRightNow')}</h3>}
        <ul className='space-y-2'>
          {isLoading ? (
            <>
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
            </>
          ) : (
            sortedFriendsArr.map((user) => {
              return <FriendsListItem key={user._id} user={user} />;
            })
          )}
        </ul>
      </div>
      <div className='text-center'>
        <Button
          color='secondary'
          className='w-full'
          disabled={!hasFriends || isLoading}
          onClick={() => {
            dispatch(openModalAction(modalNames.allFriends));
          }}
        >
          {t('labels.showAll')}
        </Button>
      </div>
    </div>
  );
};

export default Friends;
