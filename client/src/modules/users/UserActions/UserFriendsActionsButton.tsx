import React from "react";
import usersService from "services/users.service";
import { getCurrentUser } from "store/selectors/appSelectors";
import { useAppSelector } from "store/store";
import AddFriendButton from "./AddFriendButton";
import CancelSentFriendRequestButton from "./CancelSentFriendRequestButton";
import RespondToFriendRequestButton from "./RespondToFriendRequestButton";
import UnfriendButton from "./UnfriendButton";

type UserFriendsActionsButtonProps = {
	userId: string;
	buttonClassName?: string;
};

const UserFriendsActionsButton = ({
	userId,
	buttonClassName,
}: UserFriendsActionsButtonProps) => {
	const currentUser = useAppSelector(getCurrentUser);

	const isFriend = usersService.isFriend(currentUser, userId);
	const hasFriendRequestSent = usersService.hasSendFriendRequest(
		currentUser!,
		userId
	);
	const hasReceiveFriendRequest = usersService.hasReceivedFriendRequest(
		currentUser,
		userId
	);

	if (isFriend) return <UnfriendButton userId={userId} />;

	if (hasFriendRequestSent)
		return <CancelSentFriendRequestButton userId={userId} />;

	if (hasReceiveFriendRequest)
		return <RespondToFriendRequestButton userId={userId} />;

	return <AddFriendButton userId={userId} />;
};

export default UserFriendsActionsButton;
