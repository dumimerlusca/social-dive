import { AppDispatch } from "store/store";
import { UserOnRegisterType } from "components/auth/RegisterForm";
import {
	loginSucces,
	authError,
	registerSucces,
	authLoading,
	registerReset,
	errorReset,
	loadUserLoading,
	loadUserSucces,
	loadUserFail,
} from "./authSlice";
import { post } from "services/api";
import { UserOnLoginType } from "components/auth/LoginForm";

export const registerUserAction =
	(user: UserOnRegisterType) => async (dispatch: AppDispatch) => {
		try {
			dispatch(authLoading());
			dispatch(registerReset());

			await post("/auth/register", user);

			dispatch(registerSucces());
			setTimeout(() => {
				dispatch(registerReset());
			}, 3000);
		} catch (error: any) {
			dispatch(authError(getErrorMessage(error)));
			setTimeout(() => {
				dispatch(errorReset());
			}, 4000);
		}
	};

export const loginUserAction =
	(user: UserOnLoginType) => async (dispatch: AppDispatch) => {
		try {
			dispatch(authLoading());
			const {
				data: { token, user: currentUser },
			} = await post("/auth/login", user);
			localStorage.setItem("token", token);
			dispatch(loginSucces({ token, user: currentUser }));
		} catch (error) {
			dispatch(authError(getErrorMessage(error)));
			setTimeout(() => {
				dispatch(errorReset());
			}, 4000);
		}
	};

export const loadUser = () => async (dispatch: AppDispatch) => {
	try {
		const token = localStorage.getItem("token");
		if (!token) throw new Error("");
		dispatch(loadUserLoading());
		const res = await post("/auth/user", {});
		dispatch(loadUserSucces(res.data));
	} catch (error) {
		dispatch(loadUserFail(getErrorMessage(error)));
		setTimeout(() => {
			dispatch(errorReset());
		}, 4000);
	}
};

function getErrorMessage(error: any) {
	return (
		error?.response?.data?.message ?? error?.message ?? "Something Went Wrong!"
	);
}
