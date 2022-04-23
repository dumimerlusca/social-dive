import { useSelector } from "react-redux";
import { getCurrentUserId } from "store/selectors/appSelectors";

const useIsCurrentUser = (userId: string) => {
	const currentUserId = useSelector(getCurrentUserId);

	return currentUserId === userId;
};

export default useIsCurrentUser;
