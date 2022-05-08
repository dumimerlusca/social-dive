import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationType } from '../schemas/notification.schema';
import {
  NotificationTypeEnum,
  NotificationTypeFriendRequest,
  NotificationTypeLikePost,
} from '../schemas/notificationTypes';
import FriendsService from './friends.service';

@Injectable()
export default class NotificationService {
  constructor(
    @InjectModel('Notification')
    readonly notificationModel: Model<NotificationType>,
    readonly friendsService: FriendsService,
  ) {}

  async sendPostNotificationToFriends(from: string, postId: string, type: NotificationTypeEnum) {
    const receivers = await this.friendsService.getUserFriends(from);
    const notifications: NotificationTypeLikePost[] = receivers.map((receiverId) => ({
      from,
      to: receiverId,
      type: type,
      content: {
        postId,
      },
    }));
    await this.notificationModel.insertMany(notifications);
  }

  async sendPostNotificationToUser(from: string, to: string, postId: string, type: NotificationTypeEnum) {
    const notification: NotificationTypeLikePost = {
      from,
      to,
      type: type,
      content: {
        postId,
      },
    };
    await this.notificationModel.create(notification);
  }

  async sendFriendRequestNotification(from: string, to: string, friendRequestId: string, type: NotificationTypeEnum) {
    const notification: NotificationTypeFriendRequest = {
      from,
      to,
      type: type,
      content: {
        friendRequestId,
      },
    };
    await this.notificationModel.create(notification);
  }
}
