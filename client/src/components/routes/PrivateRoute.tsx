import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { layoutNames } from 'common/constansts';
import { loadUser } from 'store/auth/authActions';
import Layout from 'components/layout/Layout';

import Skeleton from 'react-loading-skeleton';
import { NewsfeedContextProvider } from 'modules/posts/context/newsfeedContext';
import { NotificationsContextProvider } from 'modules/notifications/context/notificationsContext';

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

  if (loadUserLoading && !isLoggedIn)
    return (
      <div className='h-screen w-screen overflow-hidden'>
        <Skeleton className='w-full h-full' />
      </div>
    );

  if (!isLoggedIn && !loadUserLoading) return <Navigate to='/home' />;

  return (
    <NewsfeedContextProvider>
      <NotificationsContextProvider>
        <Layout layout={layout}>{element}</Layout>
      </NotificationsContextProvider>
    </NewsfeedContextProvider>
  );
};

export default PrivateRoute;
