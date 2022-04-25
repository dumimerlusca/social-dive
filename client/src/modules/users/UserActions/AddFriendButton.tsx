import Button from "components/Button/Button";
import React from "react";
import { useSendFriendRequestV2 } from "modules/users/apiClient";

const AddFriendButton = ({ userId }: { userId: string }) => {
	const { mutate: sendFriendRequest } = useSendFriendRequestV2();

	return (
		<Button color='secondary' onClick={() => sendFriendRequest(userId)}>
			Add friend
		</Button>
	);
};

export default AddFriendButton;
