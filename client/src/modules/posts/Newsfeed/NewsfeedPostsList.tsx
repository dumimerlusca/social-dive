import React from "react";
import IPost from "../../../interfaces/IPost";
import NewsfeedPostListItem from "./NewsfeedPostListItem";
import Skeleton from "react-loading-skeleton";

interface PropTypes {
	posts: IPost[];
	isLoading: boolean;
}

const NewsfeedPostsList: React.FC<PropTypes> = ({ posts, isLoading }) => {
	return (
		<div>
			<h1 className='text-3xl mb-5 ml-5'>Newsfeed</h1>
			{isLoading ? (
				<div className='flex flex-col gap-5'>
					<Skeleton className='h-[500px]' />
					<Skeleton className='h-[500px]' />
					<Skeleton className='h-[500px]' />
					<Skeleton className='h-[500px]' />
				</div>
			) : (
				<ul>
					{posts.map(post => {
						return <NewsfeedPostListItem key={post._id} post={post} />;
					})}
				</ul>
			)}
		</div>
	);
};

export default NewsfeedPostsList;
