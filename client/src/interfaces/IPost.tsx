import IUser from './IUser';

interface IPost {
  _id: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  likes: IUser[];
  photo: boolean;
}

export default IPost;
