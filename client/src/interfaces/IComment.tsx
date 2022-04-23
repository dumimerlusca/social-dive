import IUser from "./IUser";

interface IComment {
	_id: string;
	user: IUser;
	postId: string;
	text: string;
	createdAt: string;
	updatedAt: string;
	likes: IUser[];
}

export default IComment;
