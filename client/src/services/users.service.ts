import IUser from "interfaces/IUser";
import { get } from "./api";

class UsersService {
	async getPeopleYouMightKnow() {
		const res = await get("/users/other/peopleYouMightKnow");
		return res.data;
	}

	isFriend(currentUser: IUser | null, userId: string): boolean {
		if (!currentUser) return false;
		const isInFriendList = currentUser.friends.find(
			friend => friend._id === userId
		);
		if (!isInFriendList) return false;
		return true;
	}
	hasSendFriendRequest(currentUser: IUser | null, userId: string) {
		if (!currentUser) return false;
		const exists = currentUser.friendRequestsSent.find(
			item => item._id === userId
		);
		if (!exists) return false;
		return true;
	}

	hasReceivedFriendRequest(currentUser: IUser | null, userId: string) {
		if (!currentUser) return false;
		const exists = currentUser.friendRequestsReceived.find(
			item => item._id === userId
		);
		if (!exists) return false;
		return true;
	}
}

const usersService = new UsersService();

export default usersService;
