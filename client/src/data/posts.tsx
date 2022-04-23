import IPost from "../interfaces/IPost";
import users from "./users";

const posts: IPost[] = [
	{
		_id: "10",
		user: users[0],
		description: "A very very nice place",
		createdAt: new Date(Date.now()),
		updatedAt: new Date(Date.now()),
		likes: [],
	},
	{
		_id: "15",
		user: users[2],
		description: "I wish you could be here with me",
		createdAt: new Date(Date.now()),
		updatedAt: new Date(Date.now()),
		likes: [],
	},
	{
		_id: "55",
		user: users[3],
		createdAt: new Date(Date.now()),
		updatedAt: new Date(Date.now()),
		likes: [],
	},
];

export default posts;
