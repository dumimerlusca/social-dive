import IUser from "interfaces/IUser";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import postsService from "services/posts.service";
import { getCurrentUser } from "store/selectors/appSelectors";
import { useAppSelector } from "store/store";
import { useLikePost, useUnlikePost } from "./apiClient";

type LikePostProps = {
	likes: IUser[];
	postId: string;
};

const LikePost = ({ likes, postId }: LikePostProps) => {
	const { mutate: likePost } = useLikePost(postId);
	const { mutate: unlikePost } = useUnlikePost(postId);

	const currentUser = useAppSelector(getCurrentUser);

	const [isPostLiked, setIsPostLiked] = useState(
		postsService.isItemLiked(likes, currentUser?._id)
	);

	const likePostHandler = () => {
		likePost();
	};
	const unlikePostHandler = () => {
		unlikePost();
	};

	useEffect(() => {
		setIsPostLiked(postsService.isItemLiked(likes, currentUser?._id));
	}, [likes, currentUser?._id]);

	return (
		<div className='flex items-center gap-2'>
			<button onClick={isPostLiked ? unlikePostHandler : likePostHandler}>
				{isPostLiked ? (
					<AiFillHeart className='text-red-500 text-4xl' />
				) : (
					<AiOutlineHeart className='text-red-500 text-4xl' />
				)}
			</button>
			<span className='font-light'>{likes.length} Likes</span>
		</div>
	);
};

export default LikePost;
