import Button from "components/Button/Button";
import React from "react";
import { useCancelFriendRequest } from "modules/users/apiClient";

const CancelSentFriendRequestButton = ({ userId }: { userId: string }) => {
	const { mutate: cancelFriendRequest } = useCancelFriendRequest(userId);
	return (
		<Button
			color='danger'
			onClick={() => {
				cancelFriendRequest();
			}}
		>
			Cancel request
		</Button>
	);
};

export default CancelSentFriendRequestButton;
