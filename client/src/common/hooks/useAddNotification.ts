import { NotificationTypesEnum } from 'components/Notification';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'store/ui/uiSlice';

const DEFAULT_AUTODISMISS = 3000;

const useAddNotification = () => {
  const dispatch = useDispatch();

  const showSuccessNotification = useCallback(
    (text = 'Action succeeded!', autoDismiss = DEFAULT_AUTODISMISS) => {
      dispatch(
        showNotification({ text, type: NotificationTypesEnum.success, autoDismiss: autoDismiss }),
      );
    },
    [dispatch],
  );
  const showErrorNotification = useCallback(
    (text = 'Something went wrong!', autoDismiss = DEFAULT_AUTODISMISS) => {
      dispatch(
        showNotification({ text, type: NotificationTypesEnum.error, autoDismiss: autoDismiss }),
      );
    },
    [dispatch],
  );

  const showInfoNotification = useCallback(
    (text, autoDismiss = DEFAULT_AUTODISMISS) => {
      dispatch(
        showNotification({ text, type: NotificationTypesEnum.info, autoDismiss: autoDismiss }),
      );
    },
    [dispatch],
  );

  return { showSuccessNotification, showErrorNotification, showInfoNotification };
};

export default useAddNotification;
