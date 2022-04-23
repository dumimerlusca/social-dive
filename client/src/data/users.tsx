import { BASE_API_URL } from "services/api";
import IUser from "../interfaces/IUser";

export const DEFAULT_IMAGE =
	BASE_API_URL + "/users/6245e51a0afb90dd3ccc43ed/photo";

const users: IUser[] = [
	{
		_id: "9991",
		email: "dumitruMerlusca1@gmail.com",
		fullName: "Miron Octavian",
		friends: [],
		friendRequestsSent: [],
		friendRequestsReceived: [],
	},
	{
		_id: "9992",
		email: "dumitruMerlusca@gmail.com",
		fullName: "Andrei Sava",
		friends: [],
		friendRequestsSent: [],
		friendRequestsReceived: [],
	},
	{
		_id: "99934",
		email: "dumitruMerlusca@gmail.com",
		fullName: "George Mihail",
		friends: [],
		friendRequestsSent: [],
		friendRequestsReceived: [],
	},
	{
		_id: "9993242",
		email: "dumitruMerlusca@gmail.com",
		fullName: "Andreea Deea",
		friends: [],
		friendRequestsSent: [],
		friendRequestsReceived: [],
	},
];

export default users;
