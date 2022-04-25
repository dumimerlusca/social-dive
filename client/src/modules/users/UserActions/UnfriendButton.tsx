import Button from "components/Button/Button";
import React from "react";
import { useDeleteFriend } from "modules/users/apiClient";

const UnfriendButton = ({ userId }: { userId: string }) => {
	const { mutate: deleteFriend } = useDeleteFriend();

	return (
		<Button color='danger' onClick={() => deleteFriend(userId)}>
			Unfriend
		</Button>
	);
};

export default UnfriendButton;
