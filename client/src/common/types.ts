import IUser from "interfaces/IUser";

export type MessageType = {
	user: string;
	chatId: string;
	_id: string;
	updatedAt: number;
	createdAt: number;
	text: string;
};

export type ChatType = {
	users: IUser[];
	createdAt: number;
	initiatedBy: string;
	lastMessage: string | null;
	updatedAt: number;
	_id: string;
};
