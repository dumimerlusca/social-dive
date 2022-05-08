import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CommentSchema, CommentType } from './comment.schema';
import { UserType } from './user.schema';
import { PhotoType } from './user.schema';

export type PostType = Post & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Post {
  @Prop()
  description: string;

  @Prop({
    type: {
      data: Buffer,
      contentType: String,
    },
  })
  photo: PhotoType;

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
