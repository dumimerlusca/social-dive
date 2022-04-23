import IUser from "interfaces/IUser";

class PostsService {
	isItemLiked(likes: IUser[], currentUserId?: string) {
		if (!currentUserId) return false;
		const user = likes.find(user => user._id === currentUserId);
		if (user) return true;
		return false;
	}
}

const postsService = new PostsService();

export default postsService;
