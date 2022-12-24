import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { layoutNames } from 'common/constansts';
import { loadUser } from 'store/auth/authActions';
import Layout from 'components/layout/Layout';

import { NotificationsContextProvider } from 'modules/notifications/context/notificationsContext';
import LoadUserLoadingScreen from './LoadUserLoadingScreen';

type PrivateRouteProps = {
  element: React.ReactNode;
  layout?: layoutNames;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  layout = layoutNames.authenticated,
}) => {
  const { isLoggedIn, loadUserLoading } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(loadUser());
    }
  }, [dispatch, isLoggedIn]);

  if (loadUserLoading && !isLoggedIn) return <LoadUserLoadingScreen />;

  if (!isLoggedIn && !loadUserLoading) return <Navigate to='/home' />;

  return (
    <NotificationsContextProvider>
      <Layout layout={layout}>{element}</Layout>
    </NotificationsContextProvider>
  );
};

export default PrivateRoute;
