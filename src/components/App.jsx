import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';
import { selectAccessToken } from '../redux/auth/selectors';

import RestrictedRoute from 'routes/RestrictedRoutes';
import PrivateRoutes from 'routes/PrivateRoutes';

import { Loader } from './LoaderCabbage/LoaderCabbage.styled';

import Layout from 'components/Layout';
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const OperationsPage = lazy(() =>
  import('../pages/OperationsPage/OperationsPage')
);
const ReportsPage = lazy(() => import('../pages/ReportsPage/ReportsPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(refreshUser());
  }, [dispatch, accessToken]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <RestrictedRoute
                  redirectTo="/operations"
                  component={<HomePage />}
                />
              }
            />

            <Route
              path="/google-redirect"
              element={
                <PrivateRoutes redirectTo="/" component={<HomePage />} />
              }
            />

            <Route
              path="/google-redirect"
              element={
                <PrivateRoutes
                  redirectTo="/operations"
                  component={<OperationsPage />}
                />
              }
            />

            <Route
              path="/operations"
              element={
                <PrivateRoutes redirectTo="/" component={<OperationsPage />} />
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoutes redirectTo="/" component={<ReportsPage />} />
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
};
