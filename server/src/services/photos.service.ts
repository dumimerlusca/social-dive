import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo, PhotoType } from '../schemas/photo.schema';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel('Photo')
    public photoModel: Model<PhotoType>,
  ) {}

  findById(id: string) {
    return this.photoModel.findById(id);
  }

  create(data: Photo) {
    return this.photoModel.create(data);
  }
}
