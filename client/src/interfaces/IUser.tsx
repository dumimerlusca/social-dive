interface IUser {
	_id: string;
	email: string;
	fullName: string;
	friends: IUser[];
	friendRequestsSent: IUser[];
	friendRequestsReceived: IUser[];
}

export default IUser;
