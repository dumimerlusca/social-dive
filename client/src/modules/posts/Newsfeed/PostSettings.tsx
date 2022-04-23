import { useDeletePost } from "modules/posts/apiClient";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const liClasses = "px-7 py-2 hover:bg-gray-300 transition-all duration-300";

type PostSettingsProps = {
	postId: string;
};

const PostSettings = ({ postId }: PostSettingsProps) => {
	const { mutate: deletePost, isSuccess } = useDeletePost(postId);
	const { postId: postIdParam } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess && postIdParam) {
			navigate("/");
		}
	}, [isSuccess, navigate, postIdParam]);

	return (
		<div className='bg-white text-gray-900'>
			<ul className='flex flex-col text-lg font-medium'>
				<li
					className={liClasses}
					onClick={() => {
						if (window.confirm("Are you sure?")) deletePost();
					}}
				>
					Delete
				</li>
				<li className={liClasses}>Edit</li>
			</ul>
		</div>
	);
};

export default PostSettings;
