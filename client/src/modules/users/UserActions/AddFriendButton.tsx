import Button from "components/Button/Button";
import React from "react";
import { useSendFriendRequest } from "modules/users/apiClient";

const AddFriendButton = ({ userId }: { userId: string }) => {
	const { mutate: sendFriendRequest } = useSendFriendRequest(userId);

	return (
		<Button color='secondary' onClick={() => sendFriendRequest()}>
			Add friend
		</Button>
	);
};

export default AddFriendButton;
