import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PhotoType = Photo & Document;

@Schema({})
export class Photo {
  @Prop({ required: [true, 'Buffer data required'] })
  data: Buffer;

  @Prop({ required: [true, 'Content type required'] })
  contentType: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
