import { createSlice } from "@reduxjs/toolkit";
import { ChatType } from "common/types";

type InitialStateType = {
	currentChat: ChatType | null;
};

const initialState: InitialStateType = {
	currentChat: null,
};

const chatSlice = createSlice({
	name: "chat",
	initialState: initialState,
	reducers: {
		setCurrentChat(state, action) {
			state.currentChat = action.payload;
		},
	},
});

export const chatSliceReducer = chatSlice.reducer;
export const { setCurrentChat } = chatSlice.actions;
