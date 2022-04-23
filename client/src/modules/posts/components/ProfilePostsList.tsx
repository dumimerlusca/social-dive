import IPost from "interfaces/IPost";
import ProfilePostsListItem from "modules/posts/ProfilePostsListItem/ProfilePostsListItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

type ProfilePostsListType = {
	posts: IPost[];
	isLoading: boolean;
};

const ProfilePostsList = ({ posts, isLoading }: ProfilePostsListType) => {
	if (isLoading)
		return (
			<>
				<div>
					<Skeleton className='w-full h-[300px]' />
				</div>
				<div>
					<Skeleton className='w-full h-[300px]' />
				</div>
				<div>
					<Skeleton className='w-full h-[300px]' />
				</div>
			</>
		);

	return (
		<>
			{posts.map(post => {
				return <ProfilePostsListItem key={post._id} post={post} />;
			})}
		</>
	);
};

export default ProfilePostsList;
