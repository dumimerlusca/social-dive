import { modalNames } from 'common/constansts';
import Button from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from 'store/selectors/appSelectors';
import { useAppSelector } from 'store/store';
import { openModalAction } from 'store/ui/uiSlice';
import UserFriendsActionsButton from './UserActions/UserFriendsActionsButton';

type ProfilePageUserActionsProps = {
  userId: string;
};

const ProfilePageUserActions = ({ userId }: ProfilePageUserActionsProps) => {
  const currentUser = useAppSelector(getCurrentUser);
  const dispatch = useDispatch();
  const openEditProfileModal = () => {
    dispatch(openModalAction(modalNames.editProfile));
  };

  return (
    <>
      {userId === currentUser?._id ? (
        <Button color='outline-secondary' onClick={openEditProfileModal}>
          Edit profile
        </Button>
      ) : (
        <UserFriendsActionsButton userId={userId} />
      )}
    </>
  );
};

export default ProfilePageUserActions;
