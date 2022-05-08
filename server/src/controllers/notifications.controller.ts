import { Body, Controller, Get, Injectable, Param, Patch, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationType } from '../schemas/notification.schema';
import { Model } from 'mongoose';

@Controller('api/notifications')
@Injectable()
export default class NotificationsController {
  constructor(
    @InjectModel('Notification')
    readonly notificationModel: Model<NotificationType>,
  ) {}

  @Get('')
  async getUserNotifications(@Req() req: any) {
    const userId = req.user.id;
    return await this.notificationModel
      .find({ to: userId })
      .populate('from to')
      .select('-password -photo')
      .sort({ createdAt: -1 });
  }

  @Patch(':id/markseen')
  async markSeen(@Param('id') id: string) {
    await this.notificationModel.findByIdAndUpdate(id, { seen: true });
  }
}
