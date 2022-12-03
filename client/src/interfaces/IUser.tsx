interface IUser {
  _id: string;
  email: string;
  fullName: string;
  friends: IUser[];
  friendRequestsSent: IUser[];
  friendRequestsReceived: IUser[];
  isActive: boolean;
  lastActive: string;
  isAdmin?: boolean;
}

export default IUser;
