import DeleteComment from "modules/comments/DeleteComment";
import LikeComment from "modules/comments/LikeComment/LikeComment";
import { formatDate } from "helpers/helpers";
import IComment from "interfaces/IComment";
import { Link } from "react-router-dom";
import { userImageUrl } from "services/api";
import { getCurrentUser } from "store/selectors/appSelectors";
import { useAppSelector } from "store/store";

type CommentListItemProps = {
	comment: IComment;
	postId: string;
};

const CommentListItem = ({
	postId,
	comment: { user, createdAt, likes, text, _id },
}: CommentListItemProps) => {
	const currentUser = useAppSelector(getCurrentUser);
	const isCommentAuthor = user._id === currentUser?._id;

	return (
		<li className='p-1 flex justify-between items-center gap-2'>
			<div className='flex gap-4 flex-grow'>
				<img
					className='rounded-3xl w-10 h-10 flex-shrink-0'
					src={userImageUrl(user._id)}
					alt=''
				/>
				<div className='flex-grow'>
					<Link to={`/profile/${user._id}`}>
						<h3 className='font-bold text-md cursor-pointer'>
							{user.fullName}
						</h3>
					</Link>
					<p className='font-thin text-sm'>{text}</p>
					<div className='flex justify-between items-center'>
						<LikeComment postId={postId} commentId={_id} likes={likes} />
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-1 items-center justify-end'>
				{isCommentAuthor && <DeleteComment postId={postId} commentId={_id} />}
				<p className='text-sm'>{formatDate(new Date(createdAt))}</p>
			</div>
		</li>
	);
};

export default CommentListItem;
