import IUser from 'interfaces/IUser';

export type MessageType = {
  user: string;
  chatId: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  text: string;
};

export type ChatType = {
  users: IUser[];
  createdAt: string;
  initiatedBy: string;
  lastMessage: string | null;
  updatedAt: string;
  _id: string;
};

export type FriendRequestType = {
  from: string;
  to: string;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PaginatedData<T> = {
  page: number;
  limit: number;
  total: number;
  data: T[];
};
