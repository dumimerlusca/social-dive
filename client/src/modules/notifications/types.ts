import IUser from 'interfaces/IUser';

export enum NotificationTypeEnum {
  postLike = 'postLike',
  postCreate = 'postCreate',
  postCommentAdded = 'postCommentAdded',
  postCommentLiked = 'postCommentLiked',
  friendRequest = 'friendRequest',
  friendRequestAccepted = 'friendRequestAccepted',
}

export type NotificationType = {
  _id: string;
  from: IUser;
  to: IUser;
  type: NotificationTypeEnum;
  content: NotificationContentType;
  seen: boolean;
  updatedAt: string;
  createdAt: string;
  fromSocket?: boolean;
};

type NotificationContentType = PostContentType | FriendRequestContentType;

type PostContentType = {
  postId: string;
};

type FriendRequestContentType = {
  friendRequestId: string;
};

export const isFriendRequestContentType = (
  content: NotificationContentType,
): content is FriendRequestContentType => {
  return (content as FriendRequestContentType).friendRequestId !== undefined;
};

export const isPostContentType = (content: NotificationContentType): content is PostContentType => {
  return (content as PostContentType).postId !== undefined;
};
