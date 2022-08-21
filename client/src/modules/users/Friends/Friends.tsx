import Button from "components/Button/Button";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "store/selectors/appSelectors";
import { useGetUserFriends } from "../apiClient";
import FriendsListItem from "./FriendsListItem";

const Friends = () => {
	const currentUserId = useSelector(getCurrentUserId);
	const { data: friends = [] } = useGetUserFriends(currentUserId);

	return (
		<div className='p-5 bg-primary rounded-3xl'>
			<h3 className='text-3xl mb-5'>Friends</h3>
			<ul className="overflow-auto mb-2">
				{friends.map(user => {
					return <FriendsListItem key={user._id} user={user} />;
				})}
			</ul>
			<div className='text-center'>
				<Button color='secondary' className='w-full'>
					Show more
				</Button>
			</div>
		</div>
	);
};

export default Friends;
