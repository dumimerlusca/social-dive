import * as yup from 'yup';

export enum NotificationTypeEnum {
  postLike = 'postLike',
  postCreate = 'postCreate',
  postCommentAdded = 'postCommentAdded',
}
export const NotificationsTypeList = ['postLike', 'postCreate', 'postCommentAdded'];

export const NotificationContentSchemas = {
  postContent: yup.object().shape({
    postId: yup.string().required().strict(true),
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
