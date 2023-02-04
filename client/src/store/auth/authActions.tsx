import { localStorageItems } from 'common/constansts';
import { post } from 'services/api';
import { AppDispatch } from 'store/store';
import { errorReset, loadUserFail, loadUserLoading, loadUserSucces } from './authSlice';

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    const token = localStorage.getItem(localStorageItems.token);
    if (!token) throw new Error('');
    dispatch(loadUserLoading());
    const res = await post('/auth/user', {});
    dispatch(loadUserSucces(res.data));
  } catch (error) {
    localStorage.removeItem(localStorageItems.token);
    dispatch(loadUserFail(getErrorMessage(error)));
    setTimeout(() => {
      dispatch(errorReset());
    }, 4000);
  }
};

export function getErrorMessage(error: any) {
  return error?.response?.data?.message ?? error?.message ?? 'Something Went Wrong!';
}
