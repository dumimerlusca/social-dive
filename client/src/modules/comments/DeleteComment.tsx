import { useDeleteComment } from "modules/posts/apiClient";
import { IoIosClose } from "react-icons/io";

type DeleteCommentProps = {
	postId: string;
	commentId: string;
};

const DeleteComment = ({ postId, commentId }: DeleteCommentProps) => {
	const { mutate: deleteComment, isLoading } = useDeleteComment(
		postId,
		commentId
	);

	return (
		<button
			onClick={() => {
				if (window.confirm("Are you sure?")) {
					deleteComment();
				}
			}}
		>
			{isLoading ? "..." : <IoIosClose className='text-white' />}
		</button>
	);
};

export default DeleteComment;
