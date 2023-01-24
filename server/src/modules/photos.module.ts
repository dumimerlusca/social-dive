import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoSchema } from '../schemas/photo.schema';
import { PhotosService } from '../services/photos.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Photo', schema: PhotoSchema }])],
  providers: [PhotosService],
  exports: [PhotosService, MongooseModule],
})
export class PhotosModule {}
