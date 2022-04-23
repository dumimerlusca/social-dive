import { useNavigate } from "react-router";
import { authReset } from "store/auth/authSlice";
import { useAppDispatch } from "store/store";

const useLogout = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		navigate("/login");
		localStorage.removeItem("token");
		dispatch(authReset());
	};

	return logoutHandler;
};

export default useLogout;
