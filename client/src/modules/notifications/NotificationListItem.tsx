import classNames from 'classnames';
import { formatDate } from 'helpers/helpers';
import UserFriendsActionsButton from 'modules/users/UserActions/UserFriendsActionsButton';
import React from 'react';
import { useNavigate } from 'react-router';
import { userImageUrl } from 'services/api';
import { useMarkNotificationSeen } from './apiClient';
import { isPostContentType, NotificationType, NotificationTypeEnum } from './types';

type NotificationListItemProps = {
  notification: NotificationType;
  onClickItem?: () => void;
  markSeenSuccess: (notificationId: string) => void;
};

const NotificationListItem: React.FC<NotificationListItemProps> = ({
  notification,
  onClickItem,
  markSeenSuccess,
}) => {
  const { from, type, createdAt, seen, _id, content } = notification;

  const { execute: markAsSeen } = useMarkNotificationSeen();
  const navigate = useNavigate();

  const onClick = () => {
    if (isPostContentType(content)) {
      const postId = content.postId;
      markAsSeen(_id);
      markSeenSuccess(_id);
      navigate(`/posts/${postId}`);
      return;
    }

    if (
      type === NotificationTypeEnum.friendRequestAccepted ||
      type === NotificationTypeEnum.friendRequest
    ) {
      markAsSeen(_id);
      navigate(`/profile/${from._id}`);
      return;
    }
  };

  return (
    <li onClick={onClickItem} className={classNames('', { 'text-gray-400': seen })}>
      <div className='flex gap-3 items-center cursor-pointer' onClick={onClick}>
        <img className='rounded-full h-8 w-8' src={userImageUrl(from._id)} alt='' />
        <div>
          <p className='text-thin text-inherit'>
            <span className='font-bold mr-2'>{from.fullName}</span>
            {getNotificationMessage(type)}
          </p>
          <p className='text-sm text-inherit'>{formatDate(new Date(createdAt))}</p>
        </div>
      </div>
      {type === NotificationTypeEnum.friendRequest && !seen && (
        <div
          className='flex justify-center'
          onClick={() => {
            markAsSeen(_id);
          }}
        >
          <UserFriendsActionsButton userId={from._id} />
        </div>
      )}
    </li>
  );
};

export default NotificationListItem;

function getNotificationMessage(notificationType: NotificationTypeEnum) {
  switch (notificationType) {
    case NotificationTypeEnum.postLike:
      return 'Liked your post';
    case NotificationTypeEnum.postCommentAdded:
      return 'Commented on your post';
    case NotificationTypeEnum.postCreate:
      return 'Just posted something new, go check it out!';
    case NotificationTypeEnum.postCommentLiked:
      return 'Liked your comment';
    case NotificationTypeEnum.friendRequest:
      return 'Sent you a friend request';
    case NotificationTypeEnum.friendRequestAccepted:
      return 'Accepted your friend request';
    default:
      return 'New Notification';
  }
}
