import { useTranslate } from '@tolgee/react';
import classNames from 'classnames';
import Button from 'components/Button/Button';
import UserListItemSkeleton from 'modules/users/UserListItemSkeleton';
import { CSSProperties } from 'react';
import useNotificationsContext from './context/notificationsContext';
import NotificationListItem from './NotificationListItem';

const NotificationsPanel = ({
  wrapperClassName,
  style,
}: {
  wrapperClassName?: string;
  style?: CSSProperties;
}) => {
  const { notifications, changePageNumber, pageNumber, isLoading, hasMore, markSeenSuccess } =
    useNotificationsContext();

  const t = useTranslate();

  return (
    <div
      className={classNames('p-5 rounded-3xl bg-primary flex flex-col', wrapperClassName)}
      style={{ minHeight: 200, ...style }}
    >
      <h3 className='text-3xl mb-5'>{t('labels.notifications.title')}</h3>
      <ul className='flex flex-col gap-2 overflow-auto grow'>
        {notifications.length === 0 && !isLoading && <p>{t('notifications.noNotifications')}</p>}
        {isLoading && pageNumber === 1 ? (
          <>
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
          </>
        ) : (
          notifications.map((notification) => {
            return (
              <NotificationListItem
                markSeenSuccess={markSeenSuccess}
                key={notification._id}
                notification={notification}
              />
            );
          })
        )}
      </ul>
      <Button
        tooltip={!hasMore ? t('notifications.noMoreNotifications') : undefined}
        disabled={isLoading || !hasMore}
        onClick={() => {
          if (isLoading) return;
          changePageNumber(pageNumber + 1);
        }}
        color='secondary'
        className='w-full mt-5'
      >
        {t('labels.showMore')}
      </Button>
    </div>
  );
};

export default NotificationsPanel;
