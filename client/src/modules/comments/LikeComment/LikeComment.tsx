import IUser from "interfaces/IUser";
import { useLikeComment, useUnlikeComment } from "modules/posts/apiClient";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import postsService from "services/posts.service";
import { useAppSelector } from "store/store";
import { FcLike } from "react-icons/fc";
import { getCurrentUser } from "store/selectors/appSelectors";

type LikeCommentProps = {
	postId: string;
	commentId: string;
	likes: IUser[];
};

const LikeComment = ({ postId, commentId, likes }: LikeCommentProps) => {
	const currentUser = useAppSelector(getCurrentUser);

	const [isCommentLiked, setIsCommentLiked] = useState(
		postsService.isItemLiked(likes, currentUser?._id)
	);

	useEffect(() => {
		setIsCommentLiked(postsService.isItemLiked(likes, currentUser?._id));
	}, [likes, currentUser?._id]);

	const { mutate: likeComment } = useLikeComment(postId, commentId);
	const { mutate: unlikeComment } = useUnlikeComment(postId, commentId);

	const likeCommenthandler = () => {
		likeComment();
	};

	const unlikeCommentHandler = () => {
		unlikeComment();
	};

	return (
		<div className='flex gap-2 items-center'>
			<p className='text-md'>{likes.length}</p>
			<button
				onClick={isCommentLiked ? unlikeCommentHandler : likeCommenthandler}
			>
				{isCommentLiked ? <FcLike /> : <AiFillLike />}
			</button>
		</div>
	);
};

export default LikeComment;
