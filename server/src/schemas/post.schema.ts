import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserType } from './user.schema';

export type PostType = Post & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Post {
  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' })
  photo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  likes: UserType[];

  @Prop()
  shares: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
