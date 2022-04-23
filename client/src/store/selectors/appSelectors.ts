import { RootState } from "store/store";

export const getCurrentUserId = (state: RootState) =>
	state.auth.currentUser?._id;
export const getCurrentUser = (state: RootState) => state.auth.currentUser;
export const getCurrentUserFriends = (state: RootState) =>
	state.auth.currentUser?.friends;

export const getCurrentChat = (state: RootState) => state.chat.currentChat;
