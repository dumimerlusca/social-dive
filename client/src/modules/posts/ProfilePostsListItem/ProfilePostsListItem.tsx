import Button from "components/Button/Button";
import IPost from "interfaces/IPost";
import { useGetPostComments } from "modules/posts/apiClient";
import React from "react";
import { Link } from "react-router-dom";
import { postImageUrl } from "services/api";
import classes from "./ProfilePostsListItem.module.scss";

const ProfilePostsListItem = ({ post: { _id, likes } }: { post: IPost }) => {
	const { data: comments = [] } = useGetPostComments(_id);

	return (
		<Link to={`/posts/${_id}`} className={classes.post}>
			<img
				className='w-full h-full object-cover'
				src={postImageUrl(_id)}
				alt=''
			/>
			<div className={classes.overlay}>
				<div className='flex flex-col justify-center items-center gap-3 mt-5'>
					<p>{likes.length} Likes</p>
					<p>{comments.length} Comments</p>
					<p>0 Shares</p>
				</div>
				<Button color='secondary' className=''>
					View post
				</Button>
			</div>
		</Link>
	);
};

export default ProfilePostsListItem;
