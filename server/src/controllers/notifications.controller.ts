import { Body, Controller, Get, Injectable, Param, Patch, Query, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationType } from '../schemas/notification.schema';
import { Model } from 'mongoose';
import { getAdvanceResults } from '../helpers';

@Controller('api/notifications')
@Injectable()
export default class NotificationsController {
  constructor(
    @InjectModel('Notification')
    readonly notificationModel: Model<NotificationType>,
  ) {}

  @Get('')
  async getUserNotifications(
    @Req() req: any,
    @Query('limit') limitQ: number,
    @Query('page') page: number,
  ) {
    const userId = req.user.id;
    const limit = limitQ ?? 10;

    const totalUnseeNotifications = await this.notificationModel
      .find({ to: userId, seen: false })
      .countDocuments();

    const advancedResults = await getAdvanceResults(
      this.notificationModel,
      { to: userId },
      page,
      limit,
      { path: 'from to', select: '-password -photo' },

      undefined,
      { createdAt: -1 },
    );

    return { ...advancedResults, totalUnseen: totalUnseeNotifications };
  }

  @Patch(':id/markseen')
  async markSeen(@Param('id') id: string) {
    await this.notificationModel.findByIdAndUpdate(id, { seen: true });
  }
}
