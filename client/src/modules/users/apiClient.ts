import { queryKeys } from "common/constansts";
import IUser from "interfaces/IUser";
import { useMutation, useQuery } from "react-query";
import { get, patch } from "services/api";
import usersService from "services/users.service";
import { updateCurrentUser } from "store/auth/authSlice";
import { useAppDispatch } from "store/store";

export const useGetPeopleYouMightKnow = () => {
	return useQuery<IUser[]>(
		queryKeys.peopleYouMightKnow,
		usersService.getPeopleYouMightKnow
	);
};

export const useGetUser = (userId: string) => {
	const getUser = async () => {
		const res = await get(`/users/${userId}`);
		return res.data;
	};
	const { data, isLoading, error } = useQuery<IUser>(
		queryKeys.user(userId),
		getUser
	);
	return { data, isLoading, error };
};

export const useSendFriendRequest = (userId: string) => {
	const dispatch = useAppDispatch();
	const sendFriendRequest = async () => {
		const res = await patch(`/users/${userId}/sendFriendRequest`);
		return res.data;
	};
	const { data, mutate } = useMutation(sendFriendRequest, {
		onSuccess: data => {
			dispatch(updateCurrentUser(data));
		},
	});

	return { data, mutate };
};

export const useRespondToFriendRequest = (
	userId: string,
	action: "accept" | "decline"
) => {
	const dispatch = useAppDispatch();
	const respond = async () => {
		const res = await patch(
			`/users/${userId}/respondToFriendRequest?action=${action}`
		);
		return res.data;
	};
	const { data, mutate } = useMutation(respond, {
		onSuccess: data => {
			dispatch(updateCurrentUser(data));
		},
	});

	return { data, mutate };
};

export const useCancelFriendRequest = (userId: string) => {
	const dispatch = useAppDispatch();

	const cancelFriendRequest = async () => {
		const res = await patch(`/users/${userId}/cancelFriendRequest`);
		return res.data;
	};
	const { data, mutate } = useMutation(cancelFriendRequest, {
		onSuccess: data => {
			dispatch(updateCurrentUser(data));
		},
	});

	return { data, mutate };
};

export const useUnfriend = (userId: string) => {
	const dispatch = useAppDispatch();

	const unfriend = async () => {
		const res = await patch(`/users/${userId}/deleteFriend`);
		return res.data;
	};
	const { data, mutate } = useMutation(unfriend, {
		onSuccess: data => {
			dispatch(updateCurrentUser(data));
		},
	});

	return { data, mutate };
};
