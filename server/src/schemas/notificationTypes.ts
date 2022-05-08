import * as yup from 'yup';

export enum NotificationTypeEnum {
  postLike = 'postLike',
  postCreate = 'postCreate',
  postCommentAdded = 'postCommentAdded',
  postCommentLiked = 'postCommentLiked',
  friendRequest = 'friendRequest',
  friendRequestAccepted = 'friendRequestAccepted',
}
export const NotificationsTypeList = [
  'postLike',
  'postCreate',
  'postCommentAdded',
  'postCommentLiked',
  'friendRequest',
  'friendRequestAccepted',
];

export const NotificationContentSchemas = {
  postContent: yup.object().shape({
    postId: yup.string().required().strict(true),
  }),
  friendRequestContent: yup.object().shape({
    friendRequestId: yup.string().required().strict(true),
  }),
};

export interface BaseNotificationType {
  from: string;
  to: string;
  type: NotificationTypeEnum;
}

export interface NotificationTypeLikePost extends BaseNotificationType {
  content: {
    postId: string;
  };
}

export interface NotificationTypeFriendRequest extends BaseNotificationType {
  content: {
    friendRequestId: string;
  };
}
