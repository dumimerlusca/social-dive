import Tippy from "@tippyjs/react";
import classNames from "classnames";
import useIsCurrentUser from "common/hooks/useIsCurrentUser";
import { formatDate } from "helpers/helpers";
import IPost from "interfaces/IPost";
import PostSettings from "modules/posts/Newsfeed/PostSettings";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { userImageUrl } from "services/api";

import "./PostHeader.scss";

type PostHeaderProps = {
	wrapperClassName?: string;
	post: IPost;
};

const PostHeader: React.FC<PostHeaderProps> = ({
	post: { user, createdAt, _id },
	wrapperClassName,
}) => {
	const isPostOwner = useIsCurrentUser(user._id);

	return (
		<div
			className={classNames(
				"post-header flex gap-4 items-center mb-3",
				wrapperClassName
			)}
		>
			<div className='w-14 h-14 overflow-hidden rounded-full'>
				<img
					className='w-full h-full object-cover'
					src={userImageUrl(user._id)}
					alt='profile'
				/>
			</div>
			<div>
				<Link to={`/profile/${user._id}`}>
					<h6 className='text-xl font-semibold cursor-pointer'>
						{user.fullName}
					</h6>
				</Link>
				<p>{formatDate(new Date(createdAt))}</p>
			</div>
			{isPostOwner && (
				<Tippy
					content={<PostSettings postId={_id} />}
					interactive={true}
					trigger='click'
				>
					<button className='ml-auto'>
						<BsThreeDotsVertical className='text-3xl' />
					</button>
				</Tippy>
			)}
		</div>
	);
};

export default PostHeader;
