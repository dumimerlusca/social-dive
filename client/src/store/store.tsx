import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSliceReducer from "./auth/authSlice";
import { chatSliceReducer } from "./chat/chatSlice";
import UiSliceReducer from "./ui/uiSlice";

export const store = configureStore({
	reducer: {
		auth: authSliceReducer,
		chat: chatSliceReducer,
		ui: UiSliceReducer
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
