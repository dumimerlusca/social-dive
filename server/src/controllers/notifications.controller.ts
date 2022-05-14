import { Body, Controller, Get, Injectable, Param, Patch, Query, Req } from '@nestjs/common';
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
  async getUserNotifications(@Req() req: any, @Query('limit') limitQ: number, @Query('page') page: number) {
    const userId = req.user.id;
    const limit = limitQ ?? 10;

    return await this.notificationModel
      .find({ to: userId })
      .populate('from to')
      .select('-password -photo')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  @Patch(':id/markseen')
  async markSeen(@Param('id') id: string) {
    await this.notificationModel.findByIdAndUpdate(id, { seen: true });
  }
}
