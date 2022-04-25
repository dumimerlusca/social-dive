import Button from "components/Button/Button";
import React from "react";
import {
	useDeleteFriendRequest,
	useGetSentFriendRequests,
} from "modules/users/apiClient";

const CancelSentFriendRequestButton = ({ userId }: { userId: string }) => {
	const { data: sentFriendRequests = [] } = useGetSentFriendRequests();
	const { mutate: deleteFriendRequest } = useDeleteFriendRequest();

	const currentRequest = sentFriendRequests.find(
		request => request.to === userId
	);

	return (
		<Button
			color='danger'
			onClick={() => {
				deleteFriendRequest(currentRequest?._id);
			}}
		>
			Cancel request
		</Button>
	);
};

export default CancelSentFriendRequestButton;
