import IUser from "./IUser";

interface ICurrentUser extends IUser {
	friends: IUser[];
}

export default ICurrentUser;
