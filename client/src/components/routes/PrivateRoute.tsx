import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { layoutNames } from 'common/constansts';
import { loadUser } from 'store/auth/authActions';
import Layout from 'components/layout/Layout';

import Skeleton from 'react-loading-skeleton';
import { NewsfeedContextProvider } from 'modules/posts/context/newsfeedContext';

type PrivateRouteProps = {
  element: React.ReactNode;
  layout?: layoutNames;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  layout = layoutNames.authenticated,
}) => {
  const { isLoggedIn, loadUserLoading, error } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(loadUser());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (error) navigate('/login');
  }, [error, navigate]);

  if (loadUserLoading && !isLoggedIn)
    return (
      <div className='h-screen w-screen overflow-hidden'>
        <Skeleton className='w-full h-full' />
      </div>
    );

  if (!isLoggedIn && !loadUserLoading) return <Navigate to='/login' />;

  return (
    <NewsfeedContextProvider>
      <Layout layout={layout}>{element}</Layout>
    </NewsfeedContextProvider>
  );
};

export default PrivateRoute;
