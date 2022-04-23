import Button from "components/Button/Button";
import React from "react";
import { useUnfriend } from "modules/users/apiClient";

const UnfriendButton = ({ userId }: { userId: string }) => {
	const { mutate: unfriend } = useUnfriend(userId);

	return (
		<Button color='danger' onClick={() => unfriend()}>
			Unfriend
		</Button>
	);
};

export default UnfriendButton;
