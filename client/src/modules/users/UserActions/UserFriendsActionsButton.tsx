import React from "react";
import { getCurrentUser } from "store/selectors/appSelectors";
import { useAppSelector } from "store/store";
import {
	useGetReceivedFriendRequest,
	useGetSentFriendRequests,
	useGetUserFriends,
} from "../apiClient";
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

	const { data: sentFriendRequests = [] } = useGetSentFriendRequests();
	const { data: receivedFriendRequests = [] } = useGetReceivedFriendRequest();
	const { data: friends = [] } = useGetUserFriends(currentUser._id);

	const isFriend = !!friends.find(friend => friend._id === userId);
	const hasFriendRequestSent = !!sentFriendRequests.find(
		request => request.to === userId
	);
	const hasReceiveFriendRequest = !!receivedFriendRequests.find(
		request => request.from === userId
	);

	if (isFriend) return <UnfriendButton userId={userId} />;

	if (hasFriendRequestSent)
		return <CancelSentFriendRequestButton userId={userId} />;

	if (hasReceiveFriendRequest)
		return <RespondToFriendRequestButton userId={userId} />;

	return <AddFriendButton userId={userId} />;
};

export default UserFriendsActionsButton;
