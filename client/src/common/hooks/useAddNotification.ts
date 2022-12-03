import { NotificationTypesEnum } from 'components/Notification';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'store/ui/uiSlice';

const useAddNotification = () => {
  const dispatch = useDispatch();

  const showSuccessNotification = useCallback(
    (text = 'Action succeeded!', autoDismiss = 2000) => {
      dispatch(
        showNotification({ text, type: NotificationTypesEnum.success, autoDismiss: autoDismiss }),
      );
    },
    [dispatch],
  );
  const showErrorNotification = useCallback(
    (text = 'Something went wrong!', autoDismiss = 2000) => {
      dispatch(
        showNotification({ text, type: NotificationTypesEnum.error, autoDismiss: autoDismiss }),
      );
    },
    [dispatch],
  );

  return { showSuccessNotification, showErrorNotification };
};

export default useAddNotification;
