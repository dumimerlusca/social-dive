import Button from "components/Button/Button";
import React from "react";
import { useRespondToFriendRequest } from "modules/users/apiClient";

const RespondToFriendRequestButton = ({ userId }: { userId: string }) => {
	const { mutate: declineFriendRequest } = useRespondToFriendRequest(
		userId,
		"decline"
	);

	const { mutate: acceptFriendRequest } = useRespondToFriendRequest(
		userId,
		"accept"
	);

	return (
		<div className='flex gap-3'>
			<Button color='secondary' onClick={() => acceptFriendRequest()}>
				Accept
			</Button>
			<Button color='danger' onClick={() => declineFriendRequest()}>
				Decline
			</Button>
		</div>
	);
};

export default RespondToFriendRequestButton;
