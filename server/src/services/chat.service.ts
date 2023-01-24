import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';
import { ChatType } from '../schemas/chat.schema';
import { MessageType } from '../schemas/message.schema';

export const populateOptions: PopulateOptions[] = [
  {
    path: 'users',
    model: 'User',
  },
];

@Injectable()
export default class ChatService {
  constructor(
    @InjectModel('Chat') public chatModel: Model<ChatType>,
    @InjectModel('Message') public messageModel: Model<MessageType>,
  ) {}
  async checkExistingConversation(user1Id: string, user2Id: string) {
    return await this.chatModel.findOne({
      $or: [{ users: [user1Id, user2Id] }, { users: [user2Id, user1Id] }],
    });
  }
}
