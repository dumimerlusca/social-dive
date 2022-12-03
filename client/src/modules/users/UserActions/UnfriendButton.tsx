import useAddNotification from 'common/hooks/useAddNotification';
import Button from 'components/Button/Button';
import { useDeleteFriend } from 'modules/users/apiClient';
import { useEffect } from 'react';
import { getErrorMessage } from 'store/auth/authActions';

const UNFRIEND_ADMIN_ERROR_MESSAGE = 'This action cannot be performed for the admin';

const UnfriendButton = ({ userId }: { userId: string }) => {
  const { mutate: deleteFriend, error, reset } = useDeleteFriend();

  const { showErrorNotification } = useAddNotification();

  useEffect(() => {
    if (!error) return;
    reset();
    const message = getErrorMessage(error);
    if (message === UNFRIEND_ADMIN_ERROR_MESSAGE) {
      showErrorNotification('You cannot unfried the admin');
      return;
    }

    showErrorNotification();
  }, [error, reset, showErrorNotification]);

  return (
    <Button color='danger' onClick={() => deleteFriend(userId)}>
      Unfriend
    </Button>
  );
};

export default UnfriendButton;
