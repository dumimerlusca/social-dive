import Button from "components/Button/Button";
import { getCurrentUser } from "store/selectors/appSelectors";
import { useAppSelector } from "store/store";
import UserFriendsActionsButton from "./UserActions/UserFriendsActionsButton";

type ProfilePageUserActionsProps = {
	userId: string;
};

const ProfilePageUserActions = ({ userId }: ProfilePageUserActionsProps) => {
	const currentUser = useAppSelector(getCurrentUser);

	return (
		<>
			{userId === currentUser?._id ? (
				<Button color='outline-secondary'>Edit profile</Button>
			) : (
				<UserFriendsActionsButton userId={userId} />
			)}
		</>
	);
};

export default ProfilePageUserActions;
