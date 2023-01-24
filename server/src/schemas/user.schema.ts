import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserType = User & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class User {
  @Prop({ required: [true, 'Full name is required'] })
  fullName: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  })
  email: string;

  @Prop({
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' })
  photo: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: new Date(Date.now()) })
  lastActive: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
