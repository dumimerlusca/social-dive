import Button from "components/Button/Button";
import React from "react";
import {
	useAcceptFriendRequest,
	useDeleteFriendRequest,
	useGetReceivedFriendRequest,
} from "modules/users/apiClient";

const RespondToFriendRequestButton = ({ userId }: { userId: string }) => {
	const { data: receivedFriendRequests = [] } = useGetReceivedFriendRequest();
	const { mutate: deleteFriendRequest } = useDeleteFriendRequest();

	const { mutate: acceptFriendRequest } = useAcceptFriendRequest();

	const currentRequest = receivedFriendRequests.find(
		request => request.from === userId
	);

	return (
		<div className='flex gap-3'>
			<Button
				color='secondary'
				onClick={() => acceptFriendRequest(currentRequest?._id)}
			>
				Accept
			</Button>
			<Button
				color='danger'
				onClick={() => deleteFriendRequest(currentRequest?._id)}
			>
				Decline
			</Button>
		</div>
	);
};

export default RespondToFriendRequestButton;
