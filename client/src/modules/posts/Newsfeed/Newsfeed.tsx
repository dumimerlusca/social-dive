import classNames from "classnames";
import { useNewsfeedPosts } from "modules/posts/apiClient";
import NewPost from "./NewPost";
import NewsfeedPostsList from "./NewsfeedPostsList";

type NewsfeedProps = {
	wrapperClassName?: string;
};

const Newsfeed = ({ wrapperClassName }: NewsfeedProps) => {
	const { data: posts, isLoading } = useNewsfeedPosts();

	return (
		<div className={classNames(wrapperClassName)}>
			<NewPost />
			<NewsfeedPostsList isLoading={isLoading} posts={posts ?? []} />
		</div>
	);
};

export default Newsfeed;
