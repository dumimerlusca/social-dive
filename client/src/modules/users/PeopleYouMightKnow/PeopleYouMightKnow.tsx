import React from "react";
import { useGetPeopleYouMightKnow } from "modules/users/apiClient";
import UserListItem from "modules/users/UserListItem/UserListItem";

const PeopleYouMightKnow = () => {
	const { data: users = [], isLoading, error } = useGetPeopleYouMightKnow();

	return (
		<div className='bg-primary rounded-3xl p-5 mt-5 min-h-[300px]'>
			<h1 className='text-3xl mb-3'>People you might know</h1>
			<ul className='list-none flex flex-col gap-3   overflow-auto'>
				{users.map(user => {
					return <UserListItem key={user._id} user={user} />;
				})}
			</ul>
		</div>
	);
};

export default PeopleYouMightKnow;
